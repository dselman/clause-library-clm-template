import express from "express";

const router = express.Router();
export { router as ClauseLibraryRouter };

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
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
  });
}

router.get("/documents/:documentId/mergeData", (req, res) => {
  res.setHeader("content-type", "text/xml");

  const C1 = `<p>This is <strong>a strong</strong> statement.</p>`;
  const C2 = `<p>This is <em>an emphatic</em> statement.</p>`;

  res.send(`<Clauses>
<One templateId="one">${escapeXml(C1)}</One>
<Two templateId="two">${escapeXml(C2)}</Two>
</Clauses>`);
});
