const http = require("http");

const server = http.createServer();
server.on("request", (req, res) => {
  if (req.url === "/fre") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ name: "Animeh" }));
  } else if (req.url === "/mes") {
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Hello My name is Animesh</>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/") {
    res.writeHead(400, {
      "Content-Type": "text/plain",
    });
    res.end("Hello");
  } else {
    res.writeHead(400, {
      "Content-Type": "text/plain",
    });
    res.end("Not found");
  }
});
server.listen(3000, () => {
  console.log("server is running");
});
