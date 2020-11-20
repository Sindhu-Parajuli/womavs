
import React, {useState,useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {Segment, Comment} from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import {useParams} from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./messages.css";
import firebase from "../../firebase.js";
import Chat from "../../Chat";
import ChatInput from "../../ChatInput";



function Messages() {
    const {roomId} = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            firebase.firestore().collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
        }
        if (roomId) {
            firebase.firestore().collection("rooms")

                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setRoomMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, [roomId]);




 console.log(roomDetails);

 console.log(roomMessages);

 return (
    <div className="chat">
        <div className="chat__header">
        <div className="chat__headerLeft">
        <h4 className="chat__channelName">
        <strong>#{roomDetails?.name}</strong>
       <StarBorderOutlinedIcon />
     </h4>
    </div>

   <div className="chat__headerRight">
 <p>
 <InfoOutlinedIcon /> Details
  </p>
  </div>
  </div>


        <div className="chat__messages">
            {roomMessages.map(({ message, timestamp, user, userImage }) => (
                <Chat
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                />
            ))}

        </div>
        <MessageForm channelName={roomDetails?.name} channelId={roomId} />
    </div>
     
);

}

export default Messages;
