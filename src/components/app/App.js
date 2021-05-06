import {Grid, makeStyles} from "@material-ui/core";
import {Login} from "../login/Login";
import {socket} from "../socket/Socket";

const useStyles = makeStyles({
    root: {
        height: "100vh",
        justifyContent: "center",
        background: "linear-gradient(45deg, rgba(48,63,159,1) 0%, rgba(197,17,98,1) 50%)",
    },
})

export const App = () => {
    const classes = useStyles();
    console.log(socket);
    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Login/>
            </Grid>
        </Grid>
    );
};