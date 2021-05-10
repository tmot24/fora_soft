import {onAddMessage, onSendRoomThank} from "../redux/Reducer";
import {connect} from "react-redux";
import PreLoginWithOut from "../login/LoginWithoutRoomContainer";
import {Room} from "./ChatRoom";
import {useHistory} from "react-router-dom";


const ChatRoomContainer = ({
                               joined, users, messages, userName, roomId, onAddMessage, rooms, onSendRoomThank
                           }) => {

    const history = useHistory();
    const onSendRoom = (values) => {
        alert("not implemented :(")
        onSendRoomThank(values);
        history.push(`/${values.roomId}`);
    };

    const changeRoom = () => {
        alert("not implemented :(")
    };

    return (
        <>
            {
                !joined
                    ? <PreLoginWithOut/>
                    : <Room messages={messages} userName={userName} users={users} roomId={roomId}
                            onAddMessage={onAddMessage} rooms={rooms} onSendRoom={onSendRoom} changeRoom={changeRoom}/>
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
        rooms: state.reducer.rooms,
    };
};

const mapDispatchToProps = {
    onAddMessage, onSendRoomThank,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomContainer);