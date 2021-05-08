import {makeStyles, Paper, Typography, useTheme} from "@material-ui/core";
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

export const RoomsContainer = ({roomId}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Paper className={classes.root} elevation={3}>
            <Typography noWrap className={classes.rooms}>Room {roomId}</Typography>
            <AddRoom/>
        </Paper>
    )
}