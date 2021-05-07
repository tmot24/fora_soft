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

const rooms = new Map();

app.get("/rooms/:id", (request, response) => {
    const roomId = request.params.id;
    const obj = rooms.has(roomId)
        ? {
            users: [...rooms.get(roomId).get("users").values()],
            messages: [...rooms.get(roomId).get("messages").values()]
        }
        : {
            users: [],
            messages: []
        };
    response.json(obj);
});

app.post("/rooms", (request, response) => {
    const {roomId, userName} = request.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ["users", new Map()],
            ["messages", []],
        ]));
    }
    response.send();
});

io.on("connection", socket => {
    socket.on("ROOM:JOIN", ({roomId, userName}) => {
        // подключение к сокету в определённую комнату
        socket.join(roomId);
        // сохраняем в "БД" пользователя
        rooms.get(roomId).get("users").set(socket.id, userName);
        // коллекция всех пользователей в комнате
        const users = [...rooms.get(roomId).get("users").values()];
        // всем кроме меня, в определённой комнате, отправляем сокет запрос коллекции пользователей
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
    });

    socket.on("ROOM:NEW_MESSAGE", ({roomId, userName, text}) => {
        const obj = {userName, text};
        // добавляю сообщение в БД
        rooms.get(roomId).get("messages").push(obj);
        // оповещаю пользователей в комнате
        socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", obj);
    });

    socket.on("disconnect", () => {
        rooms.forEach(((value, roomId) => {
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