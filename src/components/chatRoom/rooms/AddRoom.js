import {Field, Form, Formik} from "formik";
import {Box, Button, LinearProgress, makeStyles, useTheme} from "@material-ui/core";
import {TextField} from "formik-material-ui";

const useStyles = makeStyles(theme => ({
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const AddRoom = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

/*    useEffect(() => {
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
    };*/

    const onSendMessage = (roomName) => {
        console.log(roomName)
    }

    return (
        <Formik
            initialValues={{
                roomName: "",
            }}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(false);
                resetForm({roomName: ""});
                onSendMessage(values.roomName);
            }}
            type={"reset"}
        >
            {({submitForm, isSubmitting}) => (
                <Form>
                    <Box margin={1}>
                        <Field
                            fullWidth={true}
                            component={TextField}
                            name={"roomName"}
                            type={"roomName"}
                            label={"Room name"}
                            helperText={"Enter your room"}
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
                            Add room
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}