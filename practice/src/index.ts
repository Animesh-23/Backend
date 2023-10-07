import http from "http";

const port = 3000;
const hostname = "localhost";

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running  http://${hostname}:${port}/`);
});
