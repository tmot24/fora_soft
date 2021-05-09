import {onLogin, userRooms} from "../redux/Reducer";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {LoginWithoutRoom} from "./LoginWithoutRoom";
import {addRoomToCollection, login} from "../api/Api";


const LoginWithoutRoomContainer = ({onLogin, userRooms}) => {
    const history = useHistory();

    const onEnter = (values, setSubmitting) => {
        Promise.all([
            login(values),
            addRoomToCollection(values),
        ]).then(() => {
            onLogin(values);
            userRooms(values.userName);
            setSubmitting(false);
            history.push(`/${values.roomId}`);
        });
    };

    return (
        <LoginWithoutRoom onEnter={onEnter}/>
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
    onLogin, userRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithoutRoomContainer);