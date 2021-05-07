import {makeStyles, Paper, Typography, useTheme} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: "90vh",
        width: "20vw",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
}));

export const RoomsContainer = ({roomsId}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Paper className={classes.root} elevation={3}>
            <Typography>Room {roomsId}</Typography>
        </Paper>
    )
}