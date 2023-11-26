import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { Neogma, Neo4jSupportedProperties, QueryBuilder, QueryRunner, neo4jDriver } from 'neogma';
import { ModelUtil } from "@accordproject/concerto-core";
import { ClauseQueryResult } from './document-generator';
import { checkEnv } from './auth.js';

checkEnv('OPENAI_API_KEY');

const config:Record<string,unknown> = {
    logger: console.log
}

if(process.env.NEO4J_ENCRYPTED) {
    config.encrypted = !!process.env.NEO4J_ENCRYPTED
}

const neogma = new Neogma(
    {
        url: process.env.NEO4J_URL ? process.env.NEO4J_URL : 'bolt://localhost:7687',
        username: process.env.NEO4J_USER ? process.env.NEO4J_USER : 'neo4j',
        password: process.env.NEO4J_PASS ? process.env.NEO4J_PASS : 'onesmallstep',
    },
    config
);

const queryRunner = new QueryRunner({
    driver: neogma.driver,
    logger: console.log
});

async function getTemplate(bearerToken, accountId, templateId) {
    const url = `${process.env.CLAUSE_LIBRARY_URL}/accounts/${accountId}/templates/${templateId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        },
    });
}

async function getTemplateModel(bearerToken, accountId, templateModelName) {
    const url = `${process.env.CLAUSE_LIBRARY_URL}/accounts/${accountId}/templateModels/${templateModelName}/latest`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        },
    });
}

async function omitUnusedProperties(bearerToken, accountId, templateModelName, obj: Neo4jSupportedProperties): Promise<Neo4jSupportedProperties> {
    const templateModelResponse = await getTemplateModel(bearerToken, accountId, templateModelName);
    if (templateModelResponse.ok) {
        const templateModels = await templateModelResponse.json();
        const model = templateModels.length > 0 ? templateModels[0] : null;
        const decl = model ? model.declarations.find(d => d.name === templateModelName) : null;
        if (!decl) {
            throw new Error(`Failed to find template type ${templateModelName}`);
        }
        const newObj = {
        };
        decl.properties.forEach(property => {
            const value = obj[property.name]; // properties are optional
            if (value) {
                newObj[property.name] = value;
            }
        })
        return newObj;
    }
    else {
        throw new Error(`Failed to get template model ${templateModelName}`);
    }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteGraph(_context: GraphContext) {
    return queryRunner.run('MATCH (n) DETACH DELETE n');
}

async function createIndex() {
    await queryRunner.run('DROP INDEX template_embeddings IF EXISTS');
    await queryRunner.run('CALL db.index.vector.createNodeIndex("template_embeddings", "Template", "embedding", 1536, "COSINE")');

    await queryRunner.run('DROP INDEX clause_embeddings IF EXISTS');
    return queryRunner.run('CALL db.index.vector.createNodeIndex("clause_embeddings", "Clause", "embedding", 1536, "COSINE")');
}

// a cache of embeddings: this improves perf/cost
// but also ensures that we get the same embeddings for the same text
const embeddingCache = new Map<string,Array<number>>();

async function getEmbedding(text: string) {
    const value = embeddingCache.get(text);
    if(value) {
        return value;
    }
    else {
        const url = 'https://api.openai.com/v1/embeddings?encoding_format=float';
        const embeddingResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                input: text,
                model: 'text-embedding-ada-002'
            })
        });

        if (embeddingResponse.ok) {
            const embeddings = await embeddingResponse.json();
            const val = embeddings.data[0].embedding;
            embeddingCache.set(text, val);
            return val;
        }
        else {
            throw new Error('Failed to get embeddings for search text');
        }    
    }
}

/**
 * Performs a similarity search on nodes with text content
 * @param label the label for the node. E.g. 'Clause'
 * @param index the vector index name, E.g. 'clause_embeddings'
 * @param count the number of similar nodes to return
 * @param searchText the string to search for
 * @returns 
 */
export async function similarityQuery(label: string, index: string, count: number, searchText) {
    const embeddings = await getEmbedding(searchText);
    const q = `MATCH (l:${label})
CALL db.index.vector.queryNodes('${index}', ${count}, ${JSON.stringify(embeddings)} )
YIELD node AS similar, score
MATCH (similar)
RETURN similar.identifier as identifier, similar.content as content, score limit ${count}`;
    const queryResult  = await queryRunner.run(q);
    return queryResult.records.map(v => {
        return {
            identifier: v.get('identifier'),
            content: v.get('content'),
            score: v.get('score')
        }});
}

export async function addAgreementToGraph(context, agreementName: string, documentTemplateId: string, agreementData: Neo4jSupportedProperties): Promise<string> {
    await mergeNode(context, 'DocumentTemplate', { identifier: documentTemplateId });
    const agreementId = uuidv4();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const now:any = neo4jDriver.types.DateTime.fromStandardDate(new Date());
    const queryBuilder = new QueryBuilder().create(
        {
            label: 'Agreement',
            properties: {
                name: agreementName,
                identifier: agreementId,
                ...agreementData,
                createdAt: now
            }
        });
    await queryBuilder.run();
    await mergeRelationship(context, 'Agreement', agreementId, 'DocumentTemplate', documentTemplateId, 'GENERATED_FROM');

    const envelopeId = await addEnvelopeToGraph();

    await mergeNode(context, 'Company', { identifier: 'DocuSign' });
    await mergeNode(context, 'Company', { identifier: 'Microsoft' });
    const DS_EMPLOYEES = ['Dan Selman', 'Kamal Hathi', 'Dmitry Krakovsky', 'Inhi Suh', 'Nikhil Patel', 'Allan Thygesen'];
    const MS_EMPLOYEES = ['Satya Nadella', 'Bill Gates', 'Scott Guthrie', 'Brad Smith', 'Amy Hood', 'Kathleen Hogan'];

    for (let n = 0; n < DS_EMPLOYEES.length; n++) {
        const party = DS_EMPLOYEES[n];
        await mergeNode(context, 'Individual', { identifier: party });
        await mergeRelationship(context, 'Individual', party, 'Company', 'DocuSign', 'EMPLOYED_BY');
    }

    for (let n = 0; n < MS_EMPLOYEES.length; n++) {
        const party = MS_EMPLOYEES[n];
        await mergeNode(context, 'Individual', { identifier: party });
        await mergeRelationship(context, 'Individual', party, 'Company', 'Microsoft', 'EMPLOYED_BY');
    }

    const dsShuffled = DS_EMPLOYEES.sort(() => 0.5 - Math.random());
    const dsSigners = dsShuffled.slice(0, 2);
    const msShuffled = MS_EMPLOYEES.sort(() => 0.5 - Math.random());
    const msSigners = msShuffled.slice(0, 2);

    for (let n = 0; n < dsSigners.length; n++) {
        const signer = dsSigners[n];
        await mergeRelationship(context, 'Envelope', envelopeId, 'Individual', signer, 'SIGNED_BY');
    }

    for (let n = 0; n < msSigners.length; n++) {
        const signer = msSigners[n];
        await mergeRelationship(context, 'Envelope', envelopeId, 'Individual', signer, 'SIGNED_BY');
    }

    await mergeRelationship(context, 'Envelope', envelopeId, 'Agreement', agreementId, 'CONTAINS');
    return agreementId;
}

export async function addEnvelopeToGraph(): Promise<string> {
    const envelopeId = uuidv4();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const now:any = neo4jDriver.types.DateTime.fromStandardDate(new Date());

    const queryBuilder = new QueryBuilder().create(
        {
            label: 'Envelope',
            properties: {
                name: `Envelope ${envelopeId}`,
                identifier: envelopeId,
                signedAt: now
            }
        });

    await queryBuilder.run();
    return envelopeId;
}

function getChecksum(obj: Neo4jSupportedProperties) {
    return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');
}

async function mergeNode(context, label: string, properties: Neo4jSupportedProperties) {
    let where = '';
    const keys = Object.keys(properties);
    keys.forEach((key, index) => {
        where += `${key}: ${JSON.stringify(properties[key])}`;
        if (index < keys.length - 1) {
            where += ','
        }
    })
    return queryRunner.run(`MERGE (t:${label}{${where}})`);
}

async function mergeRelationship(context, sourceLabel: string, sourceIdentifier:
    string, targetLabel: string, targetIdentifier: string, relationshipType: string) {
    return queryRunner.run(`MATCH(source:${sourceLabel} {identifier: '${sourceIdentifier}'}) MATCH(target:${targetLabel} {identifier: '${targetIdentifier}'})MERGE (source)-[:${relationshipType}]->(target)`);
}

export async function addClauseQueryResultToGraph(accessToken: string, accountId: string, context: GraphContext, agreementId: string, agreementData: Neo4jSupportedProperties, clauseQueryResult: ClauseQueryResult) {
    if (Array.isArray(clauseQueryResult.results)) {
        clauseQueryResult.results.forEach(async r => {
            const templateResponse = await getTemplate(accessToken, accountId, r.templateId);
            if (templateResponse.ok) {
                const template = await templateResponse.json();
                const shortTypeName = ModelUtil.getShortName(template.conceptReference);
                const usedData = await omitUnusedProperties(accessToken, accountId, shortTypeName, agreementData);
                const clauseProperties: Neo4jSupportedProperties = {
                    name: `${template.name} Clause`,
                    content: r.content,
                    ...usedData
                };
                const clauseId = getChecksum(clauseProperties);
                clauseProperties.identifier = clauseId;
                if (clauseProperties.content) {
                    const embedding = await getEmbedding(clauseProperties.content as string);
                    clauseProperties.embedding = embedding;
                }
                await mergeNode(context, 'Clause', clauseProperties);
                await mergeRelationship(context, 'Agreement', agreementId, 'Clause', clauseId, 'INCLUDES');

                if (r.templateId) {
                    await mergeNode(context, 'ClauseType', { identifier: shortTypeName });
                    const templateProperties: Neo4jSupportedProperties = {
                        content: template.content.markdown,
                        identifier: r.templateId,
                        name: template.name,
                        description: template.description ? template.description : '',
                        lifecycleState: template.lifecycleState,
                        languageTag: template.languageTag,
                        jurisdiction: template.templateAttributes.jurisdiction,
                        type: shortTypeName
                    }
                    if (templateProperties.content) {
                        const embedding = await getEmbedding(templateProperties.content as string);
                        templateProperties.embedding = embedding;
                    }
                    await mergeNode(context, 'Template', templateProperties);
                    await mergeRelationship(context, 'Template', r.templateId, 'ClauseType', shortTypeName, 'TYPE_OF');
                    await mergeRelationship(context, 'Clause', clauseId, 'Template', r.templateId, 'CREATED_FROM');
                }
            }
            else {
                console.log(`Failed to find template ${r.templateId}`);
            }
        })
    }
}

export type GraphContext = {
    placeholder?: string;
}

export async function initGraph(): Promise<GraphContext> {
    await neogma.verifyConnectivity();
    await createIndex();
    return {};
}