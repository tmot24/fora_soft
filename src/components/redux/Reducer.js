import {dataRoom} from "../api/Api";

const initialState = {
    joined: false,
    roomId: null,
    userName: null,
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
        case "NEW_MESSAGE": {
            return {
                ...state,
                messages: [...state.messages, action.payload],
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

export const setUsers = (users) => (dispatch) => {
    dispatch({
        type: "SET_USERS",
        payload: users,
    });
};

export const onAddMessage = (message) => (dispatch) => {
    dispatch({
        type: "NEW_MESSAGE",
        payload: message,
    });
};

