import express from "express";
const app = express();

import { AuthRouter } from "./routes/auth.js";
import { DocumentsRouter } from "./routes/documents.js";
app.use("/", DocumentsRouter);
app.use("/auth", AuthRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
