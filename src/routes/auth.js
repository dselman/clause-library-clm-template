import express from "express";

const router = express.Router();
export { router as AuthRouter };

router.get("/callback", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ a: 1 }, null, 3));
});
