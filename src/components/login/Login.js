import {Formik, Form, Field} from "formik";
import {TextField} from "formik-material-ui";
import {Box, Button, LinearProgress, makeStyles, Paper, useTheme} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: "20vh",
        padding: theme.spacing(1),
    }
}));

export const Login = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Paper className={classes.root} elevation={3}>
            <Formik
                initialValues={{
                    name: "",
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Box margin={1}>
                            <Field
                                component={TextField}
                                name={"name"}
                                type={"name"}
                                label={"Name"}
                                helperText={"Enter your name"}
                            />
                        </Box>
                        {isSubmitting && <LinearProgress/>}
                        <Box margin={1}>
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