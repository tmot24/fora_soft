import axios from "axios";
import {socket} from "../socket/Socket";

export const login = (newValues) => {
    return axios.post("/room", newValues);
};

export const addRoomToCollection = (newValues) => {
    return axios.post("/user", newValues);
};

export const dataRoom = (values) => {
    socket.emit("ROOM:JOIN", values);
    return axios.get(`/room/${values.roomId}`);
};

export const myRooms = (userId) => {
    return axios.get(`/user/${userId}`)
}