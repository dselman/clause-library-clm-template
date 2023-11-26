import express from "express";

import { similarityQuery } from "./graph.js";

const router = express.Router();
export { router as GraphRouter };

router.get("/:label/similar", async (req, res) => {
  if (!req.params.label) {
    res.status(400);
    throw new Error('Label is missing');
  }

  const LABELS = ['Clause', 'Template'];
  if (!LABELS.includes(req.params.label)) {
    res.status(400);
    throw new Error('Unsupported label');
  }

  const index = req.params.label === 'Clause' ? 'clause_embeddings' : 'template_embeddings';
  const count = req.query.count ? req.query.count : '10';
  const search = req.query.q;

  if (typeof count !== "string") {
    throw new Error("Query param 'count' has to be of type string");
  }

  if (!search) {
    res.status(400);
    throw new Error('Search query is missing');
  }

  try {
    const result = await similarityQuery(req.params.label, index, Number.parseInt(count), search);
    res.send(result);
  }
  catch (err) {
    res.status(500);
    res.end();
    console.log(err);
  }
});
