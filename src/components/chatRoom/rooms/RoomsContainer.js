import {List, ListItem, ListItemText, makeStyles, Paper, Typography, useTheme} from "@material-ui/core";
import {AddRoom} from "./AddRoom";

const useStyles = makeStyles(theme => ({
    root: {
        height: "90vh",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    rooms: {
        height: `calc(100% - 122px)`,
        overflow: "auto",
    },
}));

export const RoomsContainer = ({userName, roomId, rooms, onSendRoom}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Paper className={classes.root} elevation={3}>
            <Typography noWrap>Current room {roomId}</Typography>
            <List className={classes.rooms}>
                {
                    rooms.map((room, index) =>
                        <ListItem button key={index} onClick={() => console.log("try changeRoom")}>
                            <ListItemText>{room}</ListItemText>
                        </ListItem>
                    )
                }
            </List>
            <AddRoom onSendRoom={onSendRoom} userName={userName}/>
        </Paper>
    );
};