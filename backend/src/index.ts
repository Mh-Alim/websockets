import express from "express";
import { WebSocketServer, WebSocket } from "ws";
const app = express();

const httpServer = app.listen(8080, () =>
  console.log(`server is running on 8080`)
);


const wss = new WebSocketServer({ server: httpServer });
let userCount = 0;
wss.on("connection", (ws) => {
  console.log("userCount: ", ++userCount);
  ws.on("error", (err) => console.log("Error while connection: ", err));

  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("Hello message from websocket server");
});
