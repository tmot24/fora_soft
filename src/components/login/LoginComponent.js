import {Formik, Form, Field} from "formik";
import {TextField} from "formik-material-ui";
import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: "inline-table",
        marginTop: "20vh",
        padding: theme.spacing(1),
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const LoginComponent = ({onLogin}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onEnter = (values, setSubmitting) => {
        axios.post("/rooms", values)
            .then(() => {
                onLogin(values);
                setSubmitting(false);
            });
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <Formik
                initialValues={{
                    roomId: "",
                    userName: "",
                }}
                onSubmit={(values, {setSubmitting}) => onEnter(values, setSubmitting)}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Box margin={1}>
                            <Field
                                component={TextField}
                                name={"roomId"}
                                type={"roomId"}
                                label={"Room ID"}
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                                component={TextField}
                                name={"userName"}
                                type={"userName"}
                                label={"Name"}
                                helperText={"Enter your name"}
                            />
                        </Box>
                        {isSubmitting && <LinearProgress/>}
                        <Box margin={1} className={classes.button}>
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