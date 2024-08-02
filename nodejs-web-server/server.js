const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.statusCode = 200;

  const { method } = req;
  
  if (method === "GET") {
    res.end("<h1>Halo!!</h1>");
  }
  if (method === "POST") {
    res.end("<h1>HAIIII!!</h1>");
  }
  if (method === "PUT") {
    res.end("<h1>Bonjour!!</h1>");
  }
  if (method === "DELETE") {
    res.end("<h1>Salam!!</h1>");
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
