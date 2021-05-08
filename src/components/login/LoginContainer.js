import {Login} from "./Login";
import {onAddMessage, onLogin, setUsers} from "../redux/Reducer";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {login} from "../api/Api";


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
        login(newValues)
            .then(() => {
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
        joined: state.reducer.joined,
        roomId: state.reducer.roomId,
        userName: state.reducer.userName,
        users: state.reducer.users,
        messages: state.reducer.messages,
    };
};

const mapDispatchToProps = {
    setUsers, onAddMessage, onLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);