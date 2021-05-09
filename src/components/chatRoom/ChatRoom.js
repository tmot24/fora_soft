import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {RoomsContainer} from "./rooms/RoomsContainer";
import {PeopleComponent} from "./people/PeopleComponent";
import {Chat} from "./chat/Chat";
import {socket} from "../socket/Socket";

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "space-evenly",
        alignItems: "center",
    }
}));

export const Room = ({roomId, messages, userName, users, onAddMessage, rooms, onSendRoom, changeRoom}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onSendMessage = (message) => {
        const date = new Date();
        const time = date.toLocaleTimeString();
        const day = date.toLocaleDateString();
        socket.emit("ROOM:NEW_MESSAGE", {
            roomId,
            userName,
            text: message,
            date: {day, time},
        });
        onAddMessage({
            userName,
            text: message,
            date: {day, time},
        });
    };

    return (
        <Grid container className={classes.root}>
            <Grid item sm={2}>
                <RoomsContainer roomId={roomId} rooms={rooms} onSendRoom={onSendRoom} changeRoom={changeRoom}
                                userName={userName}
                />
            </Grid>
            <Grid item sm={5}>
                <Chat messages={messages} onSendMessage={onSendMessage}/>
            </Grid>
            <Grid item sm={2}>
                <PeopleComponent users={users}/>
            </Grid>
        </Grid>
    );
};