import {onAddMessage, onLogin, setUsers} from "../redux/Reducer";
import {connect} from "react-redux";
import PreLoginWithOut from "../login/LoginWithoutRoomContainer";
import {Room} from "./ChatRoom";


const ChatRoomContainer = ({joined, users, messages, userName, roomId, onAddMessage}) => {
    return (
        <>
            {
                !joined
                    ? <PreLoginWithOut/>
                    : <Room messages={messages} userName={userName} users={users} roomId={roomId}
                            onAddMessage={onAddMessage}/>
            }
        </>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomContainer);