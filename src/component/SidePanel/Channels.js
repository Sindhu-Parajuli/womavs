import React, {useEffect, useState} from "react";
import {Menu, Icon, Modal, Form, Input, Button} from "semantic-ui-react";
import firebase from "../../firebase.js";

function Channels() {
    const [channels, setchannels] = useState([]);
    const [channelName, setchannelName] = useState('');
    const [channelDetails, setchannelDetails] = useState('');
    const [modal, setmodal] = useState('');
    const [openModal, setopenModal] = useState(true);
    const [closeModal, setcloseModal] = useState(false);

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
        const {channelsRef, channelName, channelDetails, user} = this.state;


        firebase.firestore().collection('rooms').add({
            name: channelName,
            details: channelDetails,
        }).then(() => {
            this.setState({channelName: "", channelDetails: ""});
            this.closeModal();
        })
    };

    const displayChannels = channels =>
        channels.length > 0 &&
        channels.map(channel => (
            <Menu.Item
                //key={channel.id}
                onClick={() => console.log(channel)}
                name={channel.name}
                style={{opacity: 0.7}}
            >
                # {channel.name}
            </Menu.Item>
        ));

    const handleSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        const {channelName, channelDetails} = this.state;
        if (channelName && channelDetails) {
            console.log("here")
            this.addChannel();
        }
    };

    const handleChange = event => {
        this.setState({[event.target.name]: event.target.value});

    };

    return (
        <React.Fragment>
            <Menu.Menu style={{paddingBottom: "2em", paddingTop: "3em"}}>
                <Menu.Item>
          <span>
            <Icon name="exchange"/> ROOMS
          </span>{" "}
                    ({channels.length}) <Icon name="add" onClick={this.openModal}/>
                </Menu.Item>
                {this.displayChannels(channels)}
                {/* Channels */}
            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header> Add a Room </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label="Name of Room"
                                name="channelName"
                                onChange={this.handleChange}
                            />

                        </Form.Field>

                        <Form.Field>
                            <Input
                                fluid
                                label="About the Room"
                                name="channelDetails"
                                onChange={this.handleChange}
                            />

                        </Form.Field>

                    </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark"/> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove"/> Cancel
                    </Button>
                </Modal.Actions>

            </Modal>
        </React.Fragment>
    );
}

export default Channels;