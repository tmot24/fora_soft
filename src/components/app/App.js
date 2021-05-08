import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {LoginComponent} from "../login/LoginComponent";
import {useEffect, useReducer} from "react";
import {Reducer} from "../reducer/Reducer";
import {socket} from "../socket/Socket";
import {ChatComponent} from "../chatRoom/ChatComponent";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        justifyContent: "center",
        background: "linear-gradient(45deg, rgba(48,63,159,1) 0%, rgba(197,17,98,1) 50%)",
    },
}));

export const App = () => {
    const [state, dispatch] = useReducer(Reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: [],
    }, undefined);
    const theme = useTheme();

    useEffect(() => {
        socket.on("ROOM:SET_USERS", setUsers);
        socket.on("ROOM:NEW_MESSAGE", onAddMessage);
    }, []);

    const setUsers = (users) => {
        dispatch({
            type: "SET_USERS",
            payload: users,
        });
    };

    const onAddMessage = (message) => {
        dispatch({
            type: "NEW_MESSAGE",
            payload: message,
        });
    };

    const onLogin = async (values) => {
        dispatch({
            type: "JOINED",
            payload: values,
        });
        socket.emit("ROOM:JOIN", values);
        const {data} = await axios.get(`/rooms/${values.roomId}`);
        dispatch({
            type: "SET_DATA",
            payload: data,
        });
    };

    const classes = useStyles(theme);
    return (
        <Grid container className={classes.root}>
            {!state.joined
                ? <LoginComponent onLogin={onLogin}/>
                : <ChatComponent {...state} onAddMessage={onAddMessage}/>}
        </Grid>
    );
};