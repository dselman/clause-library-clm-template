import express from "express";
// import jwt from "jsonwebtoken";

import { WORKFLOW } from "./workflow.js";

const router = express.Router();
export { router as AuthRouter };

export function checkEnv(name: string) {
  if (!process.env[name]) {
    throw new Error(`${name} environment variable has not been set`);
  } else {
    console.log(`${name}: ${process.env[name]}`);
  }
}

export async function getAccessToken(assertion: string) {
  if (!assertion) {
    throw new Error('JWT Grant is missing.');
  }
  const basicAuth = `${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`;
  const authString = Buffer.from(basicAuth).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  };

  const response = await fetch(
    `https://${process.env.BASE_PATH}/oauth/token`,
    options
  );
  const json = await response.json();
  if (!json.access_token) {
    throw new Error("Failed to get access token.");
  }
  else {
    console.log('Got access token');
    console.log(JSON.stringify(json, null, 2));
  }
  return json.access_token;
}



export async function getAccessTokenFromRefreshToken(refresh_token: string) {
  if (!refresh_token) {
    throw new Error('Refresh token is missing.');
  }
  const basicAuth = `${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`;
  const authString = Buffer.from(basicAuth).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  };

  const response = await fetch(
    `https://${process.env.BASE_PATH}/oauth/token`,
    options
  );
  const json = await response.json();
  if (!json.access_token) {
    throw new Error("Failed to get access token.");
  }
  else {
    console.log('Got access token');
    console.log(JSON.stringify(json, null, 2));
  }
  return json.access_token;
}

export async function getUserAccessToken(code: string) {
  if (!code) {
    throw new Error('Code is missing.');
  }
  const basicAuth = `${process.env.CLIENT_ID}:${process.env.SECRET_KEY}`;
  const authString = Buffer.from(basicAuth).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
    }),
  };

  const response = await fetch(
    `https://${process.env.BASE_PATH}/oauth/token`,
    options
  );
  const json = await response.json();
  if (!json.access_token) {
    throw new Error("Failed to get access token.");
  }
  else {
    console.log('Got access token');
    console.log(JSON.stringify(json, null, 2));
  }
  return json.access_token;
}

checkEnv("SERVER_URL");
checkEnv("CLIENT_ID");
// checkEnv("PRIVATE_KEY");
// checkEnv("EXPIRES_IN");
checkEnv("BASE_PATH");
checkEnv("USER_ID");
checkEnv("SECRET_KEY");

// const SCOPES =
//   "signature impersonation content clause_read clause_write model_read model_write spring_read";
    
// models_read models_write 
// const SCOPES =
//   "signature extended spring_read models_read models_write adm_entity_esign_read adm_entity_esign_write";

const SCOPES =
   "signature extended spring_read models_read models_write adm_entity_esign_read adm_entity_esign_write";

router.get("/login", async (req, res) => {
  res.redirect(
    encodeURI(
      `https://${process.env.BASE_PATH}/oauth/auth?response_mode=query&response_type=code&scope=${SCOPES}&client_id=${process.env.CLIENT_ID}&state=foo&redirect_uri=${process.env.SERVER_URL}/auth/callback`
    )
  );
});

router.get("/callback", async (req, res) => {
  try {
    // const payload = {
    //   aud: process.env.BASE_PATH,
    //   iss: process.env.CLIENT_ID,
    //   scope: SCOPES,
    //   sub: process.env.USER_ID,
    // };

    // const assertion = jwt.sign(
    //   payload,
    //   Buffer.from(process.env.PRIVATE_KEY, "utf-8"),
    //   { algorithm: "RS256", expiresIn: 3600 }
    // );

    // check that the assertion is valid
    // await getAccessToken(assertion);
    const { code } = req.query;

    if (typeof code !== "string") {
      throw new Error("Query param 'code' has to be of type string");
    }

    if(!process.env.SERVER_URL) {
      throw new Error('Server URL not set');
    }

    const accessToken = await getUserAccessToken(code);
    console.log(`Access token: ${accessToken}`);
    // console.log(`Assertion: ${assertion}`);
    const token = accessToken.refresh_token;

    // SECURITY: this embeds the token into the CLM workflow
    // allowing the CLM Workflow to act on behalf of the end user
    const wf = JSON.stringify(WORKFLOW, null, 2)
      .replaceAll("${BEARER_TOKEN}", token)
      .replaceAll("${SERVER_URL}", process.env.SERVER_URL);

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment; filename=clause-library-clm-workflow.json",
    });
    res.end(wf);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
