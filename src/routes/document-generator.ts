import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import * as xpath from 'xpath';
import { default as JsZip } from 'jszip';
import { checkEnv } from './auth.js';

export const TAG_RE = /^<#(.+)#>/;
const CLAUSE_PREFIX = '//Clauses/';

checkEnv("CLAUSE_LIBRARY_URL");

type ClauseQuery = {
    type: string;
    tagId?: string;
    query: string | null | undefined;
    version: string | null | undefined;
    modifier: string | null | undefined;
}

function queryToString(query:ClauseQuery) : string {
    const version = query.version ? `@${query.version}` : '';
    return `${query.type}${version}(${query.query})${query.modifier}`;
}

export type ClauseContent = {
    content: string;
    templateId?: string;
}

export type ClauseQueryError = {
    error: string;
}

export type ClauseQueryResult = {
    query: ClauseQuery;
    results: ClauseContent[] | ClauseQueryError;
}

export type TemplateData = Record<string, unknown>;
export type GenerationResult = {
    document: Document;
    queryResults: ClauseQueryResult[];
}

const W_NAMESPACE = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

const wSelect = xpath.useNamespaces({
    w: W_NAMESPACE,
});

type Format = 'wordml' | 'markdown' | 'html';

// eslint-disable-next-line @typescript-eslint/require-await
async function generateContent(accountId: string, bearerToken: string,
    templateQuery: ClauseQuery, format: Format, data: object) {
    const version = templateQuery.version ? `@${templateQuery.version}` : '';
    const modifier = templateQuery.modifier ? `${templateQuery.modifier}` : '';
    const selector = `${templateQuery.type}${version}(${templateQuery.query})${modifier}`;
    const url = `${process.env.CLAUSE_LIBRARY_URL}/accounts/${accountId}/templates/generateContent?format=${format}&selectionQuery=${encodeURIComponent(selector)}`;
    // console.log(url);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        },
        body: JSON.stringify(data),
    });
    return res;
}

function getParagraphAsText(paragraphElement: Node) {
    let outputString = '';
    const textElements = wSelect('.//w:t', paragraphElement);
    if (Array.isArray(textElements)) {
        textElements.forEach(
            (textElement) => (outputString += textElement.textContent)
        );
    }
    return outputString;
}

function getClauseQuery(paraAsText: string): ClauseQuery | undefined {
    const isTag = paraAsText.match(TAG_RE);
    if (isTag && isTag.length > 0 && isTag[1]) {
        const domparser = new DOMParser();
        const contentDoc = domparser.parseFromString(isTag[1], 'text/xml');
        const richTexts = contentDoc.getElementsByTagName('RichText');
        const richText = richTexts.length > 0 ? richTexts[0] : null;
        if (richText) {
            const select = richText.getAttribute('Select')?.trim();
            const typePlusTagId = select?.startsWith(CLAUSE_PREFIX) ? select?.substring(CLAUSE_PREFIX.length) : null;
            const firstSlash = typePlusTagId?.indexOf('/');
            const type = firstSlash && firstSlash > 0 ? typePlusTagId?.substring(0,firstSlash) : typePlusTagId;
            const tagId = firstSlash && firstSlash > 0 ? typePlusTagId?.substring(firstSlash+1).trim() : undefined;
            const query = richText.getAttribute('Query')?.trim();
            const version = richText.getAttribute('Version')?.trim();
            const modifier = richText.getAttribute('Modifier')?.trim();
            if (type) {
                return {
                    type,
                    tagId,
                    query,
                    version,
                    modifier
                }
            }
        }
    }

    return undefined;
}

function firstElement(parentNode:Node) {
    const elements:Array<ChildNode> = [];
    for(let n=0; n < parentNode?.childNodes.length; n++) {
        const node = parentNode.childNodes.item(n);
        if(node.nodeType === node.ELEMENT_NODE) {
            elements.push(node);
        }
    }
    return elements.length > 0 ? elements[0] : undefined;
}

/**
 * Removes HTML prolog attributes from clause content. CLM Doc Gen
 * seems to struggle with these...
 * @param item the clause content item to be processed
 * @returns a new clause content item with HTML prolog removed from content
 */
function cleanContent(item: ClauseContent): ClauseContent {
    const domparser = new DOMParser();
    const contentDoc = domparser.parseFromString(item.content, 'text/html');
    const bodies = contentDoc.getElementsByTagName('body');
    const firstBody = (bodies && bodies.length > 0) ? bodies.item(0) : null;
    const divChild = firstBody ? firstElement(firstBody) : null;
    if (divChild) {
        const serialized = new XMLSerializer().serializeToString(divChild);
        return {
            content: serialized,
            templateId: item.templateId,
        }
    } else {
        return item;
    }
}

/**
 * A Document Generator that takes a DOCX Buffer as input
 * and returns a new DOCX Buffer with the references to the
 * clause library replaced by contents from the clause library.
 */
export class DocumentGenerator {
    bearerToken: string;
    accountId: string;

    constructor(accountId: string, bearerToken: string) {
        this.bearerToken = bearerToken;
        this.accountId = accountId;
    }

    /**
     * Generates contents within an XML Document
     *
     * @param {Document} document processes an XML document
     * @param {TemplateData} data the data to merge with the document
     * @returns {Promise<Document>} the updated XML document
     */
    async generateFromDocument(document: Document, data: TemplateData, format: Format) {
        const paragraphElements = wSelect('//w:p', document);
        const queries: ClauseQuery[] = [];

        if (Array.isArray(paragraphElements)) {
            for (let n = 0; n < paragraphElements.length; n++) {
                const para = paragraphElements[n];
                const paraAsText = getParagraphAsText(para);
                const clauseQuery = getClauseQuery(paraAsText);
                if (clauseQuery) {
                    queries.push(clauseQuery)
                }
            }
        }

        queries.forEach(q => {
            console.log(`Found clause: ${queryToString(q)}`);
        })

        const result: Array<ClauseQueryResult> = [];

        for (let n = 0; n < queries.length; n++) {
            const query = queries[n];
            try {
                const response = await generateContent(this.accountId, this.bearerToken, query, format, data);
                if (response.ok) {
                    const content = await response.json();
                    result.push({
                        query,
                        results: content.results.map(cleanContent)
                    });
                } else {
                    result.push({
                        query,
                        results: { error: `Clause ${queryToString(query)} failed to get content ${response.status} ${response.statusText}` }
                    });
                }
            }
            catch (error) {
                result.push({
                    query,
                    results: { error: `Clause ${queryToString(query)} failed to get content: ${error}` }
                });
            }
        }

        return result;
    }

    /**
     * Processes an input DOCX file, replacing all the Clause Library
     * Queries with calls the generated content.
     * @param {string} docxFile the Node Buffer to a DOCX file (or path to a zip file)
     * @param {TemplateData} data the data to use to generate content
     * @returns {Promise<object>} the content data
     */
    async generate(docxFile: Buffer, data: TemplateData, format: Format) {
        const zip = await JsZip.loadAsync(docxFile);
        const zipFile = zip.file('word/document.xml');
        if (zipFile) {
            const docxString = await zipFile.async('string');
            const domparser = new DOMParser();
            const document = domparser.parseFromString(docxString, 'application/xml');
            return this.generateFromDocument(document, data, format);
        }
        else {
            throw new Error('Failed to find word/document.xml');
        }
    }
}