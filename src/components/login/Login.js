import {Formik, Form, Field} from "formik";
import {TextField} from "formik-material-ui";
import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: "inline-table",
        marginTop: "20vh",
        padding: theme.spacing(1),
        width: "294"
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const Login = ({onEnter}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Paper className={classes.root} elevation={3}>
            <Formik
                initialValues={{
                    userName: "",
                    roomId: "",
                }}
                validate={(values => {
                    const errors = {};
                    if (!values.userName) {
                        errors.userName = "Required";
                    } else if (!values.roomId) {
                        errors.roomId = "Required";
                    }
                    return errors;
                })}
                onSubmit={(values, {setSubmitting}) => onEnter(values, setSubmitting)}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Box margin={1}>
                            <Field
                                component={TextField}
                                name={"userName"}
                                type={"userName"}
                                label={"Name"}
                                helperText={"Enter your name"}
                                fullWidth={true}
                            />
                        </Box>
                        <Box margin={1}>
                            <Field
                                component={TextField}
                                name={"roomId"}
                                type={"roomId"}
                                label={"Room ID"}
                                helperText={"Create your first room or insert the invitation link"}
                                fullWidth={true}
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