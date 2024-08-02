const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Powered-By", "Node.js")

  res.statusCode = 200;

  const { method } = req;

  if (method === "GET") {
    res.end("<h1>Halo!!</h1>");
  }
  if (method === "POST") {
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      res.end(`<h1>Haii ${name}!</h1>`);
    });
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
