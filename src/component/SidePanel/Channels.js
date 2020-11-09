import React from "react";
import { Menu, Icon , Modal , Form , Input , Button} from "semantic-ui-react";

class Channels extends React.Component {
    state = {
        channels: [],
        channelName:'',
        channelDetails:'',
        modal:false
    };
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})

    }

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
                <Form>
                    <Form.Field>
                     <Input
                         fluid
                         label="Name of Room"
                         name = "roomName"
                         onChange={this.handleChange}
                       />

                    </Form.Field>

                    <Form.Field>
                        <Input
                            fluid
                            label="About the Room"
                            name = "roomDetails"
                            onChange={this.handleChange}
                        />

                    </Form.Field>

                </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted>
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