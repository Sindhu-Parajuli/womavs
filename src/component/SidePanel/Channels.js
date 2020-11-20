import React, {useEffect, useState} from "react";
import {Menu, Icon, Modal, Form, Input, Button} from "semantic-ui-react";
import firebase from "../../firebase.js";
import { useHistory } from "react-router-dom";

function Channels(id,name) {
    const history = useHistory();
    const [channels, setchannels] = useState([]);
    const [channelName, setchannelName] = useState('');
    const [channelDetails, setchannelDetails] = useState('');
    const [modal, setmodal] = useState(false);
    const [event, setEvent] = useState('');

    useEffect(() => {
        firebase.firestore().collection("rooms").onSnapshot((snapshot) =>
            setchannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }))
            )
        );
    }, []);

    const addChannel = () => {
        firebase.firestore().collection('rooms').add({
            name: channelName,
            details: channelDetails,
        }).then(() => {
            setmodal(false);
        })
    };
    const selectChannel = () => {
        if (id) {
            history.push(`/chatroom/room/${id}`);
        } else {
            history.push(name);
        }
    };


    const displayChannels = channels =>
        channels.length > 0 &&
        channels.map(channel => (
            <Menu.Item
                //key={channel.id}
                //onClick={() => console.log(channel)}
                name={channel.name}
                id={channel.id}
                style={{opacity: 0.7}}
            >
                # {channel.name}
            </Menu.Item>
        ));



    function handleSubmit(event) {
        event.preventDefault();
        if (channelName && channelDetails) {
            addChannel();
        }
    };

    function setchannelNameEvent(event) {
        setchannelName(event.target.value);
    };

    function setchannelDetailsEvent(event) {
        setchannelDetails(event.target.value);
    };

    return (
        <React.Fragment>
            <Menu.Menu style={{paddingBottom: "2em", paddingTop: "3em"}}>
                <Menu.Item>
          <span>
            <Icon name="exchange"/> ROOMS
          </span>({channels.length}) <Icon name="add"  onClick={() => setmodal(true)}/>
                </Menu.Item>
                {displayChannels(channels)}
            </Menu.Menu>

            <Modal basic open={modal}>
                <Modal.Header> Add a Room </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label="Name of Room"
                                name="channelName"
                                onChange={setchannelNameEvent}
                            />

                        </Form.Field>

                        <Form.Field>
                            <Input
                                fluid
                                label="About the Room"
                                name="channelDetails"
                                onChange={setchannelDetailsEvent}
                            />

                        </Form.Field>

                    </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={handleSubmit}>
                        <Icon name="checkmark"/> Add
                    </Button>
                    <Button color="red" inverted onClick={() => setmodal(false)}>
                        <Icon name="remove"/> Cancel
                    </Button>
                </Modal.Actions>

            </Modal>
        </React.Fragment>
    );
}

export default Channels;