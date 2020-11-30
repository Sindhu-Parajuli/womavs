import React, {useState} from "react";
import {Button, Input, Segment} from "semantic-ui-react";
import {emojiIndex, Picker} from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {useStateValue} from "../../StateProvider";
import firebase from "firebase";


function MessageForm({channelName, channelId}) {
    const [input, setInput] = useState("");
    const [{user}] = useStateValue();
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [message, setmessage] = useState("");


    const sendMessage = (e) => {

        firebase.auth().onAuthStateChanged(function (usr) {
            //e.preventDefault();

            if (channelId && usr && input) {
                e.preventDefault();
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



    const handleTogglePicker = () => setEmojiPicker(true);



    const colonToUnicode = input => {
        return input.replace(/:[A-Za-z0-9_+-]+:/g, x => {
            x = x.replace(/:/g, "");
            let emoji = emojiIndex.emojis[x];
            if (typeof emoji !== "undefined") {
                let unicode = emoji.native;
                if (typeof unicode !== "undefined") {
                    return unicode;
                }
            }
            x = ":" + x + ":";
            return x;
        });
    };


    const handleAddEmoji = emoji => {
        const newMessage = colonToUnicode(` ${input} ${emoji.colons} `);
        setInput(newMessage);
        setEmojiPicker(false);
        console.log(newMessage);


    };


    return (
        <Segment className="message__form">
            {emojiPicker && (
                <Picker
                    set="apple"
                    onSelect={handleAddEmoji}
                    className="emojipicker"
                    title="Pick your emoji"
                    emoji="point_up"
                />
            )}


            <Input


                fluid
                name="message"
                style={{marginBottom: "0.3em"}}
               style={{marginTop: "0em"}}
                label={
                    <Button
                        //icon={"add"}

                        icon={emojiPicker ? "close" : "add"}
                        content={emojiPicker ? "Close" : null}
                        onClick={handleTogglePicker}
                    />
                }
                placeholder="Write your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}

                placeholder={`Message #${channelName?.toLowerCase()}`}
            />


            <Button.Group icon  widths="2" >
                <Button
                    color="orange"
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                    onClick={sendMessage}
                />



            </Button.Group>
        </Segment>
    );

}

export default MessageForm;