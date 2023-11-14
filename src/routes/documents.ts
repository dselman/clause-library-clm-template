import express from "express";

import { checkEnv, getAccessTokenFromRefreshToken } from "./auth.js";
import { DocumentGenerator } from "./document-generator.js";

const router = express.Router();
export { router as DocumentsRouter };

checkEnv("CLM_CONTENT_URL");

function replacer(substring: string): string {
  switch (substring) {
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case "&":
      return "&amp;";
    case "'":
      return "&apos;";
    case '"':
      return "&quot;";
  }
  return substring;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, replacer);
}

router.post("/documents/:documentId/mergeData", async (req, res) => {
  const authHeader = req.header('Authorization');
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(403);
      throw new Error('Authorization Bearer token is missing');
    }

    if (!req.params.documentId) {
      res.status(400);
      throw new Error('DocumentId is missing');
    }

    const data = req.body?.mergeData ? req.body?.mergeData : {};

    const bearerToken = authHeader.substring('Bearer '.length);
    console.log(bearerToken);
    const accessToken = await getAccessTokenFromRefreshToken(bearerToken);

    // get the default account id for the user
    const useInfoResponse = await fetch(`https://${process.env.BASE_PATH}/oauth/userinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    if (!useInfoResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userInfo = await useInfoResponse.json();
    const defaultAccounts = Array.isArray(userInfo?.accounts) ? userInfo?.accounts.filter(a => a.is_default) : [];

    if (defaultAccounts.length < 1) {
      throw new Error('Did not find default account');
    }

    const account = defaultAccounts[0];

    console.log(`User ${userInfo.sub} in account ${account.account_id} is generating mergeData for document ${req.params.documentId}`);
    const documentUrl = `${process.env.CLM_CONTENT_URL}/v2/${account.account_id}/documents/${req.params.documentId}`
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };

    const response = await fetch(documentUrl, options);
    if (!response.ok) {
      throw new Error(`Failed to load document ${response.status} ${response.statusText}`);
    }
    const docBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(docBuffer);
    const documentGenerator = new DocumentGenerator(account.account_id, accessToken);
    const result = await documentGenerator.generate(buffer, data, 'html');

    let xml = `<root>
   <Clauses>`;
    result.forEach(r => {
      if (Array.isArray(r.results)) {
        if(r.results.length > 0) {
          xml += `<${r.query.type}>`;
          if(r.query.tagId) {
            xml += `<${r.query.tagId}>`;
          }
          xml += escapeXml(r.results[0].content);
          if(r.query.tagId) {
            xml += `</${r.query.tagId}>`;
          }
          xml += `</${r.query.type}>`;
        }
        else {
          xml += `<${r.query.type}></${r.query.type}>`
        }
      }
      else {
        xml += `<${r.query.type}>${escapeXml(r.results.error)}</${r.query.type}>`
      }
    })

    xml += `   </Clauses>
</root>`

    res.setHeader("content-type", "text/xml");
    res.send(xml);
  }
  catch (err) {
    res.status(500);
    res.end();
    console.log(err);
  }
});
