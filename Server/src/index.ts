import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { join } from "node:path";

// Main Router
import ApplictionRouter from "./modules";

// Const
import { SERVERPORT } from "./constants";

// Websockets
import ChatWebsocket from "./modules/chats";

// Websockets Middleware
import checkChatIdentification from "./modules/chats/middleware";

const SteamServer = express();
const httpServer = createServer(SteamServer);
const io = new SocketIOServer(httpServer);

SteamServer.use(express.json());
SteamServer.disable("x-powered-by");

SteamServer.use("/api", ApplictionRouter);

SteamServer.get("/chat1", (req, res) => {
    res.sendFile(join(__dirname, '../src/chat1.html'));
});
SteamServer.get("/chat2", (req, res) => {
    res.sendFile(join(__dirname, '../src/chat2.html'));
});

// ------------> Socket.IO Config - "/chat"
const Websocket = io.of("/chat")
Websocket.use(checkChatIdentification)
Websocket.on("connection", ChatWebsocket);

// ------------> Socket.IO Config - "/notifications"

// Server Listing
httpServer.listen(SERVERPORT, () => {
    console.log(`Steam Server Up on: http://localhost:${SERVERPORT}`);
});
