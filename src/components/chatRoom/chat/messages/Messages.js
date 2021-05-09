import {makeStyles, Paper, Typography, useTheme} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    text: {
        wordWrap: "break-word",
    }
}));

export const Messages = ({messages}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            {
                messages.map((messages, index) =>
                    <Paper className={classes.paper} key={index} elevation={3}>
                        <Typography className={classes.text} variant={"h6"}>User name: {messages.userName}</Typography>
                        <Typography className={classes.text} variant={"body1"}>Text: {messages.text}</Typography>
                        <Typography className={classes.text} variant={"body2"}>{messages.date.time}</Typography>
                        <Typography className={classes.text} variant={"body2"}>{messages.date.day}</Typography>
                    </Paper>
                )
            }
        </div>
    );
};