import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { Neogma, Neo4jSupportedProperties, QueryBuilder, QueryRunner } from 'neogma';
import { ModelUtil } from "@accordproject/concerto-core";
import { ClauseQueryResult } from './document-generator';

const neogma = new Neogma(
    {
        url: 'bolt://localhost:7687',
        username: 'neo4j',
        password: 'onesmallstep',
    },
    {
        logger: console.log,
        encrypted: false,
    }
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

async function omitUnusedProperties(bearerToken, accountId, templateModelName, obj:Neo4jSupportedProperties) : Promise<Neo4jSupportedProperties> {
    const templateModelResponse = await getTemplateModel(bearerToken, accountId, templateModelName);
    if(templateModelResponse.ok) {
        const templateModels = await templateModelResponse.json();
        const model = templateModels.length > 0 ? templateModels[0] : null;
        const decl = model ? model.declarations.find( d => d.name === templateModelName) : null;
        if(!decl) {
            throw new Error(`Failed to find template type ${templateModelName}`);
        }
        const newObj = {
        };
        decl.properties.forEach( property => {
            const value = obj[property.name]; // properties are optional
            if(value) {
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

export async function addAgreementToGraph(context, agreementName: string, agreementData: Neo4jSupportedProperties): Promise<string> {
    const agreementId = uuidv4();
    const queryBuilder = new QueryBuilder().create(
        {
            label: 'Agreement',
            properties: {
                name: agreementName,
                identifier: agreementId,
                ...agreementData
            }
        });

    await queryBuilder.run();
    return agreementId;
}

function getChecksum(obj:Neo4jSupportedProperties) {
    return crypto.createHash('md5').update(JSON.stringify(obj)).digest('hex');
}

async function mergeNode(context, label:string, properties: Neo4jSupportedProperties) {
    let where = '';
    const keys = Object.keys(properties);
    keys.forEach( (key,index) => {
        where += `${key}: ${JSON.stringify(properties[key])}`;
        if(index < keys.length-1) {
            where += ','
        }
    })
    return queryRunner.run(`MERGE (t:${label}{${where}})`);
}

async function mergeRelationship(context, sourceLabel:string, sourceIdentifier: 
    string, targetLabel:string, targetIdentifier:string, relationshipType:string) {
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
                const clauseProperties:Neo4jSupportedProperties = {
                    name: `${template.name} Clause`,
                    content: r.content,
                    ...usedData
                };
                const clauseId = getChecksum(clauseProperties);
                clauseProperties.identifier = clauseId;
                await mergeNode(context, 'Clause', clauseProperties);
                await mergeRelationship(context, 'Agreement', agreementId, 'Clause', clauseId, 'INCLUDES');

                if (r.templateId) {
                    await mergeNode(context, 'ClauseType', {identifier: shortTypeName});
                    const templateProperties = {
                        content: template.content.markdown,
                        identifier: r.templateId,
                        name: template.name,
                        description: template.description ? template.description : '',
                        lifecycleState: template.lifecycleState,
                        languageTag: template.languageTag,
                        jurisdiction: template.templateAttributes.jurisdiction,
                        type: shortTypeName
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
    return {};
}