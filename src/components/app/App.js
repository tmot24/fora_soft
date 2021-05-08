import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";
import LoginComponent from "../login/LoginContainer";
import ChatComponent from "../chatRoom/ChatRoomContainer";
import {useEffect} from "react";
import {socket} from "../socket/Socket";
import {onAddMessage, onLogin, setUsers} from "../redux/Reducer";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
        justifyContent: "center",
        background: "linear-gradient(45deg, rgba(48,63,159,1) 0%, rgba(197,17,98,1) 50%)",
    },
}));

const App = ({setUsers, onAddMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    useEffect(() => {
        socket.on("ROOM:SET_USERS", setUsers);
        socket.on("ROOM:NEW_MESSAGE", onAddMessage);
    }, [onAddMessage, setUsers]);

    return (
        <Grid container className={classes.root}>
            <Switch>
                <Route path={"/"} exact component={LoginComponent}/>
                <Route path={"/:roomId?"} component={ChatComponent}/>
            </Switch>
        </Grid>
    )
}


const mapStateToProps = (state) => {
    return {
        joined: state.reducer.joined,
        roomId: state.reducer.roomId,
        userName: state.reducer.userName,
        users: state.reducer.users,
        messages: state.reducer.messages,
    };
};

const mapDispatchToProps = {
    setUsers, onAddMessage, onLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);