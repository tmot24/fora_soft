import {Field, Form, Formik} from "formik";
import {Box, Button, LinearProgress, makeStyles, useTheme} from "@material-ui/core";
import {TextField} from "formik-material-ui";

const useStyles = makeStyles(theme => ({
    button: {
        display: "flex",
        justifyContent: "flex-end"
    }
}));

export const AddRoom = ({onSendRoom, userName}) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Formik
            initialValues={{
                roomName: "",
            }}
            validate={(values => {
                const errors = {};
                if (!values.roomName) {
                    errors.roomName = "Required";
                }
                return errors;
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(false);
                resetForm({roomName: ""});
                const roomId = values.roomName;
                onSendRoom({userName, roomId});
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
    );
};