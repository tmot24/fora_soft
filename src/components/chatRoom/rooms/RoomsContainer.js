import {List, ListItem, ListItemText, makeStyles, Paper, Typography, useTheme} from "@material-ui/core";
import {AddRoom} from "./AddRoom";
import {useHistory} from "react-router-dom";

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

export const RoomsContainer = ({roomId, rooms, onSendRoom}) => {
    const theme = useTheme();
    const history = useHistory();
    const classes = useStyles(theme);

    return (
        <Paper className={classes.root} elevation={3}>
            <Typography noWrap>Current room {roomId}</Typography>
            <List className={classes.rooms}>
                {
                    rooms.map((room, index) =>
                        <ListItem button key={index} onClick={() => history.push(room)}>
                            <ListItemText>{room}</ListItemText>
                        </ListItem>
                    )
                }
            </List>
            <AddRoom onSendRoom={onSendRoom}/>
        </Paper>
    );
};