import {onAddMessage, userRooms} from "../redux/Reducer";
import {connect} from "react-redux";
import PreLoginWithOut from "../login/LoginWithoutRoomContainer";
import {Room} from "./ChatRoom";
import {addRoomToCollection, login} from "../api/Api";


const ChatRoomContainer = ({
                               joined, users, messages, userName, roomId, onAddMessage, rooms
                           }) => {

    const onSendRoom = (roomName) => {
        console.log(roomName);
        addRoomToCollection({userName, roomName})
            .then(data =>
                console.log(data)
            )

    }

    return (
        <>
            {
                !joined
                    ? <PreLoginWithOut/>
                    : <Room messages={messages} userName={userName} users={users} roomId={roomId}
                            onAddMessage={onAddMessage} rooms={rooms} onSendRoom={onSendRoom}/>
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
    onAddMessage, addRoomToCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomContainer);