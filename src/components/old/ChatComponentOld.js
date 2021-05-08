import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {Chat} from "../chatRoom/chat/Chat";
import {PeopleComponent} from "../chatRoom/people/PeopleComponent";
import {RoomsContainer} from "../chatRoom/rooms/RoomsContainer";

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "space-evenly",
        alignItems: "center",
    }
}));

export const ChatComponentOld = ({users, messages, userName, roomId, onAddMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item sm={2}>
                    <RoomsContainer roomsId={roomId}/>
                </Grid>
                <Grid item sm={5}>
                    <Chat messages={messages} userName={userName} roomId={roomId} onAddMessage={onAddMessage}/>
                </Grid>
                <Grid item sm={2}>
                    <PeopleComponent users={users}/>
                </Grid>
            </Grid>
        </>

    );
};