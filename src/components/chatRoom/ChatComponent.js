import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {Chat} from "./chat/Chat";
import {PeopleComponent} from "./people/PeopleComponent";
import {RoomsContainer} from "./rooms/RoomsContainer";

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "space-evenly",
        alignItems: "center",
    }
}));

export const ChatComponent = ({users, messages, userName, roomId, onAddMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item>
                    <RoomsContainer roomsId={roomId}/>
                </Grid>
                <Grid item>
                    <Chat messages={messages} userName={userName} roomId={roomId} onAddMessage={onAddMessage}/>
                </Grid>
                <Grid item>
                    <PeopleComponent users={users}/>
                </Grid>
            </Grid>
        </>

    );
};