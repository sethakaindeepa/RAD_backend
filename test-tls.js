const tls = require("tls");

const host =
  "ac-brxfuvf-shard-00-00.llwrxqs.mongodb.net";

const socket = tls.connect({
  host,
  port: 27017,
  servername: host,
  timeout: 10000
});

socket.on("secureConnect", () => {
  console.log("TLS connection successful!");
  console.log("Authorized:", socket.authorized);
  console.log("Protocol:", socket.getProtocol());
  socket.end();
});

socket.on("error", (error) => {
  console.error("TLS error:", error);
});

socket.on("timeout", () => {
  console.log("TLS connection timed out");
  socket.destroy();
});