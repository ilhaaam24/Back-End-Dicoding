const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  const {method, url} = req;

  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(`<h1>ini adalah homepage</h1>`);
    } else {
      res.statusCode = 400;
      res.end(`<h1>halaman tidak dapat diakses dengan ${method} request</h1>`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(`<h1>inni adalah halaman about</h1>`);
    } else if (method === "POST") {
      let body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        res.statusCode = 200;
        res.end(`<h1>Haii ${name}, ini adalah halaman about</h1>`);
      });
    }
  } else {
    res.statusCode = 404;
    res.end(`<h1>Halaman tidak ditemukan</h1>`);
  }
  
}

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
})