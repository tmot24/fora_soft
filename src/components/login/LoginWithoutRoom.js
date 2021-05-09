import {Formik, Form, Field} from "formik";
import {TextField} from "formik-material-ui";
import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        display: "inline-table",
        marginTop: "20vh",
        padding: theme.spacing(1),
        width: 294,
    },
    button: {
        display: "flex",
        justifyContent: "flex-end"
    },
}));

export const LoginWithoutRoom = ({onEnter}) => {
    const theme = useTheme();
    const roomId = useParams().roomId;
    const classes = useStyles(theme);

    return (
        <Paper className={classes.root} elevation={3}>
            <Formik
                initialValues={{
                    userName: "",
                }}
                validate={(values => {
                    const errors = {};
                    if (!values.userName) {
                        errors.userName = "Required";
                    }
                    return errors;
                })}
                onSubmit={(values, {setSubmitting}) => onEnter({
                    userName: values.userName,
                    roomId: roomId,
                }, setSubmitting)}
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