// Серверную часть, конечно же, лучше хранить отдельно
import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

// создаю express приложение
const app = express();
// создаю сервер через express приложение
const server = createServer(app);
// подключение сокетов к серверу
const io = new Server(server, { cors: { origin: "*" } });

const rooms = new Map();

app.get("/rooms", (request, response) => {
    response.json(rooms);
});

io.on("connection", socket => {
    console.log(`user connected ${socket.id}`);
});

server.listen(3000, (error) => {
    if (error) throw Error(error);
    console.log("server started...");
});
