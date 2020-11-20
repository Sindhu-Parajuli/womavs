import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import { useState } from "react";


import { useStateValue } from "../../StateProvider";
import firebase from "firebase";




function MessageForm({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {

        firebase.auth().onAuthStateChanged(function (usr) {
            e.preventDefault();

                if (channelId && usr) {
                    firebase.firestore().collection("rooms").doc(channelId).collection("messages").add({
                        message: input,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        user: usr.displayName,
                        userImage: usr.photoURL,
                    });

                    setInput("");
                }


            })
    }

    return (
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    style={{ marginBottom: "0.7em" }}
                    label={<Button icon={"add"} />}
                    labelPosition="left"
                    placeholder="Write your message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}

                />
                <Button.Group icon widths="2">
                    <Button
                        color="orange"
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        onClick={sendMessage}
                    />
                    <Button
                        color="blue"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />
                </Button.Group>
            </Segment>
        );

}

export default MessageForm;