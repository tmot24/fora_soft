import {Grid, makeStyles, useTheme} from "@material-ui/core";
import {RoomsContainer} from "./rooms/RoomsContainer";
import {PeopleComponent} from "./people/PeopleComponent";
import {Chat} from "./chat/Chat";

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: "space-evenly",
        alignItems: "center",
    }
}));

export const Room = ({roomId, messages, userName, users, onAddMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container className={classes.root}>
            <Grid item sm={2}>
                <RoomsContainer roomId={roomId}/>
            </Grid>
            <Grid item sm={5}>
                <Chat messages={messages} userName={userName} roomId={roomId} onAddMessage={onAddMessage}/>
            </Grid>
            <Grid item sm={2}>
                <PeopleComponent users={users}/>
            </Grid>
        </Grid>
    )
}