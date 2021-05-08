import {onAddMessage, onLogin, setUsers} from "../redux/Reducer";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import {LoginWithoutRoom} from "./LoginWithoutRoom";
import {login} from "../api/Api";


const LoginWithoutRoomContainer = ({onLogin}) => {
    const history = useHistory();

    const onEnter = (values, setSubmitting) => {
        login(values)
            .then(() => {
                onLogin(values);
                setSubmitting(false);
                history.push(`/${values.roomId}`)
            });
    };

    return (
        <LoginWithoutRoom onEnter={onEnter}/>
    )
}


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

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithoutRoomContainer)