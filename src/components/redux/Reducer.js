import {addRoomToCollection, dataRoom, login, myRooms} from "../api/Api";

const initialState = {
    joined: false,
    roomId: null,
    userName: null,
    rooms: [],
    users: [],
    messages: [],
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "JOINED": {
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId,
                rooms: [...state.rooms, action.payload.roomId]
            };
        }
        case "SET_DATA": {
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages,
            };
        }
        case "SET_USERS": {
            return {
                ...state,
                users: action.payload,
            };
        }
        case "SET_ROOMS": {
            return {
                ...state,
                rooms: [...state.rooms, action.payload]
            };
        }
        case "NEW_MESSAGE": {
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        }
        case "SET_ROOM_ID": {
            return {
                ...state,
                roomId: action.payload,
            };
        }
        default:
            return state;
    }
};


export const onLogin = (values) => async (dispatch) => {
    dispatch({
        type: "JOINED",
        payload: values,
    });
    const {data} = await dataRoom(values);
    dispatch({
        type: "SET_DATA",
        payload: data,
    });
};

export const userRooms = (values) => (dispatch) => {
    myRooms(values).then(data => {
        dispatch({
            type: "SET_ROOMS",
            payload: data.data.rooms,
        });
    });
};

export const setUsers = (users) => (dispatch) => {
    dispatch({
        type: "SET_USERS",
        payload: users,
    });
};

export const setRoomId = (roomId) => (dispatch) => {
    dispatch({
        type: "SET_ROOM_ID",
        payload: roomId,
    });
};

export const onAddMessage = (message) => (dispatch) => {
    dispatch({
        type: "NEW_MESSAGE",
        payload: message,
    });
};

export const onSendRoomThank = (values) => (dispatch) => {
    Promise.all([
        login(values),
        addRoomToCollection(values),
    ]).then(() => {
        onLogin(values);
        dispatch(setRoomId(values.roomId));
        dispatch(userRooms(values.roomId));
    });
};
