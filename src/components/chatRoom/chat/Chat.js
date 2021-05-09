import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-material-ui";
import {Messages} from "./messages/Messages";
import {useEffect, useRef} from "react";

const useStyles = makeStyles(theme => ({
    root: {
        height: "90vh",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    messages: {
        height: `calc(100% - 122px)`,
        overflow: "auto",
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const Chat = ({messages, onSendMessage}) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const messagesRef = useRef();

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

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