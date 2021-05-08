import {makeStyles, Paper, Typography, useTheme} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: "90vh",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
}));

export const PeopleComponent = ({users}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Paper className={classes.root} elevation={3}>
            <Typography>Online: {users.length}</Typography>
            {
                users.map((name, index) => <Typography noWrap key={index}>{name}</Typography>)
            }
        </Paper>
    )
}