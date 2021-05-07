import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {Messages} from "./messages/Messages";
import {socket} from "../../socket/Socket";
import {useEffect, useRef} from "react";

const useStyles = makeStyles(theme => ({
    root: {
        height: "90vh",
        width: "40vw",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    messages: {
        flexGrow: 1,
        height: `calc(100% - 155px)`,
        overflow: "auto",
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const Chat = ({messages, userName, roomId, onAddMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const messagesRef = useRef();

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    const onSendMessage = (message) => {
        socket.emit("ROOM:NEW_MESSAGE", {
            roomId,
            userName,
            text: message,
        });
        onAddMessage({
            userName,
            text: message,
        });
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <div ref={messagesRef} className={classes.messages}>
                <Messages messages={messages}/>
            </div>
            <Formik
                initialValues={{
                    message: "",
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(false);
                    resetForm({message: ""});
                    onSendMessage(values.message);
                }}
                type={"reset"}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Box margin={1}>
                            <Field
                                fullWidth={true}
                                component={TextField}
                                name={"message"}
                                type={"message"}
                                label={"Message"}
                                helperText={"Enter your message"}
                            />
                        </Box>
                        {isSubmitting && <LinearProgress/>}
                        <Box className={classes.button}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
};