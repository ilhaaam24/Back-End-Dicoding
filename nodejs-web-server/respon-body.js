const http = require("http");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Powered-By", "Node.js");

  const { method, url } = req;

  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify({
        message: 'ini adalah homepage'
      }));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({
        message: 'halaman tidak dapat diakses dengan ' + method + ' request'
      }));
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify({
        message: 'ini adalah halaman about'
      }));
    } else if (method === "POST") {
      let body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify({
          message: `Haloo ${name}, ini adalah halaman about`
        }));
      });
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify(
      {
        message: 'Halaman tidak ditemukan'
      }
    ));
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
