const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = require("./server");

const PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT, () => {
  console.log(`UP AND RUNNING ON PORT: ${PORT}`);
});

// {
//   cert: fs.readFileSync(path.join(__dirname, "keys", "cert.pem")),
//   key: fs.readFileSync(path.join(__dirname, "keys", "key.pem")),
// }
