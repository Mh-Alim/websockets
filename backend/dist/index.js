"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => console.log(`server is running on 8080`));
const wss = new ws_1.WebSocketServer({ server: httpServer });
let userCount = 0;
wss.on("connection", (ws) => {
    console.log("userCount: ", ++userCount);
    ws.on("error", (err) => console.log("Error while connection: ", err));
    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("Hello message from websocket server");
});
