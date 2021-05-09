import {Login} from "./Login";
import {onLogin} from "../redux/Reducer";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {addRoomToCollection, login} from "../api/Api";


const LoginContainer = ({onLogin}) => {
    const history = useHistory();

    const onEnter = (values, setSubmitting) => {
        let {userName, roomId} = values;
        const regex = new RegExp("\\/[^\\/]+$");
        if (regex.test(roomId)) {
            const arrayMatch = roomId.match(regex);
            roomId = arrayMatch[0].slice(1);
        }
        const newValues = {userName, roomId};
        Promise.all([
            login(newValues),
            addRoomToCollection(newValues),
        ]).then(() => {
            onLogin(newValues);
            setSubmitting(false);
            history.push(`/${newValues.roomId}`);
        });
    };

    return (
        <Login onEnter={onEnter}/>
    );
};


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = {
    onLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);