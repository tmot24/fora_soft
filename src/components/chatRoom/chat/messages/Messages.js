import {makeStyles, Typography, useTheme} from "@material-ui/core";
import {useEffect, useRef} from "react";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    }
}));

export const Messages = ({messages}) => {
    const theme = useTheme();

    const classes = useStyles(theme);
    return (
        <div className={classes.root}>
            {
                messages.map((messages, index) =>
                    <div key={index}>
                        <Typography>{messages.text}</Typography>
                        <Typography>{messages.userName}</Typography>
                    </div>
                )
            }
        </div>
    );
};