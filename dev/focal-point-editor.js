const fs = require("fs/promises");
const path = require("path");

const editorPath = path.join(__dirname, "focal-point-editor.html");
const galleryPath = path.join(__dirname, "..", "src", "_data", "gallery.json");

function sendJson(res, statusCode, value) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(value));
}

async function readRequestBody(req) {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
    if (body.length > 10_000) {
      throw new Error("Request body is too large");
    }
  }

  return JSON.parse(body || "{}");
}

function serializeGallery(gallery) {
  const rows = gallery.map((item) => {
    const fields = Object.entries(item)
      .map(([key, value]) => `${JSON.stringify(key)}: ${JSON.stringify(value)}`)
      .join(", ");
    return `  { ${fields} }`;
  });
  return `[\n${rows.join(",\n")}\n]\n`;
}

module.exports = async function focalPointEditor(req, res, next) {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/__dev/focal-points/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(await fs.readFile(editorPath, "utf8"));
    return;
  }

  if (req.method === "GET" && url.pathname === "/__dev/api/gallery") {
    const gallery = JSON.parse(await fs.readFile(galleryPath, "utf8"));
    sendJson(res, 200, gallery);
    return;
  }

  if (req.method === "POST" && url.pathname === "/__dev/api/focal-point") {
    try {
      const { slug, x, y } = await readRequestBody(req);
      const coordinatesAreValid =
        Number.isFinite(x) && Number.isFinite(y) &&
        x >= 0 && x <= 1 && y >= 0 && y <= 1;

      if (typeof slug !== "string" || !coordinatesAreValid) {
        sendJson(res, 400, { error: "Expected a slug and x/y coordinates from 0 to 1." });
        return;
      }

      const gallery = JSON.parse(await fs.readFile(galleryPath, "utf8"));
      const item = gallery.find((candidate) => candidate.slug === slug);

      if (!item) {
        sendJson(res, 404, { error: `No gallery item found for ${slug}.` });
        return;
      }

      item.focalPoint = {
        x: Math.round(x * 10_000) / 10_000,
        y: Math.round(y * 10_000) / 10_000,
      };

      await fs.writeFile(galleryPath, serializeGallery(gallery), "utf8");
      sendJson(res, 200, { slug, focalPoint: item.focalPoint });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  return next();
};
