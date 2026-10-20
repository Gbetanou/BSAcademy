const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..", "maquette");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".woff2": "font/woff2" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end("404"); } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); res.end(d); });
}).listen(5174, () => console.log("http://localhost:5174"));
