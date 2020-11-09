import React from "react";
import { Menu, Icon , Modal , Form , Input , Button} from "semantic-ui-react";
import firebase from "../../firebase.js";

class Channels extends React.Component {
    state = {
        channels: [],
        channelName:'',
        channelDetails:'',
        channelsRef:firebase.database().ref('channels'),
        //channelsRef:firebase.firestore().collection('channels'),
        modal:false
    };

    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state;

        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,

        };

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({ channelName: "", channelDetails: "" });
                this.closeModal();
                console.log("channel added");
            })
            .catch(err => {
                console.error(err);
            });
    };


    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state)
        const {channelName, channelDetails}= this.state;
        if (channelName && channelDetails) {
            console.log("here")
            this.addChannel();
        }
    };



    handleChange = event => {
        this.setState({[event.target.name]:event.target.value});

    };
    openModal = () => this.setState({ modal: true });
    closeModal = () => this.setState({modal:false});

    render() {
        const { channels,modal } = this.state;

        return (
            <React.Fragment>
            <Menu.Menu style={{ paddingBottom: "2em" , paddingTop:"3em"} }>
                <Menu.Item>
          <span>
            <Icon name="exchange" /> ROOMS
          </span>{" "}
                    ({channels.length}) <Icon name="add" onClick={this.openModal} />
                </Menu.Item>

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
                         name = "channelName"
                         onChange={this.handleChange}
                       />

                    </Form.Field>

                    <Form.Field>
                        <Input
                            fluid
                            label="About the Room"
                            name = "channelDetails"
                            onChange={this.handleChange}
                        />

                    </Form.Field>

                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>

            </Modal>
            </React.Fragment>

        );
    }
}

export default Channels;