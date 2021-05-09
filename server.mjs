// Серверную часть, конечно же, лучше хранить отдельно
import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

// создаю express приложение
const app = express();
// создаю http сервер через express приложение
const server = createServer(app);
// подключение сокетов к серверу
const io = new Server(server);
// express приложение может принимать json
app.use(express.json());

const roomsDB = new Map();
const usersRoomsDB = new Map();

app.get("/room/:id", (request, response) => {
    const roomId = request.params.id;
    const obj = roomsDB.has(roomId)
        ? {
            users: [...roomsDB.get(roomId).get("users").values()],
            messages: [...roomsDB.get(roomId).get("messages").values()]
        }
        : {
            users: [],
            messages: []
        };
    response.json(obj);
});

app.get("/user/:id", (request, response) => {
    const userId = request.params.id;
    const obj = usersRoomsDB.has(userId)
        ? {
            rooms: [...usersRoomsDB.get(userId).get("rooms").values()],
        }
        : {
            rooms: [],
        };
    response.json(obj);
});

app.post("/room", (request, response) => {
    const {roomId} = request.body;
    if (!roomsDB.has(roomId)) {
        roomsDB.set(roomId, new Map([
            ["users", new Map()],
            ["messages", []],
            ["date", []],
        ]));
    }
    response.send();
});

app.post("/user", (request, response) => {
    const {userName, roomId} = request.body;
    if (!usersRoomsDB.has(userName)) {
        usersRoomsDB.set(userName, new Map([
            ["rooms", new Set([roomId])],
        ]));
    } else {
        usersRoomsDB.get(userName).get("rooms").add(roomId);
    }
    response.send();
});

io.on("connection", socket => {
    socket.on("ROOM:JOIN", ({roomId, userName}) => {
        // подключение к сокету в определённую комнату
        socket.join(roomId);
        // сохраняем в "БД" пользователя
        roomsDB.get(roomId).get("users").set(socket.id, userName);
        // коллекция всех пользователей в комнате
        const users = [...roomsDB.get(roomId).get("users").values()];
        // всем кроме меня, в определённой комнате, отправляем сокет запрос коллекции пользователей
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
    });

    socket.on("ROOM:NEW_MESSAGE", ({roomId, userName, text, date}) => {
        const obj = {userName, text, date};
        // добавляю сообщение в БД
        roomsDB.get(roomId).get("messages").push(obj);
        // оповещаю пользователей в комнате
        socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
    });

    socket.on("disconnect", () => {
        roomsDB.forEach(((value, roomId) => {
            if (value.get("users").delete(socket.id)) {
                // получаем актуальный список всех пользователей
                const users = [...value.get("users").values()];
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
            }
        }));
    });

    console.log(`user connected ${socket.id}`);
});

// в package.json необходимо указать proxy для корректной работы
server.listen(9999, (error) => {
    if (error) throw Error(error);
    console.log("server started...");
});