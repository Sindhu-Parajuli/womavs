import React from 'react';
import {Row, Col} from "react-bootstrap";
import {Input, Label, Menu} from 'semantic-ui-react'
import Channels from "./Channels";

class SidePanel extends React.Component {

    render() {
        return (
            <Col md={3}>
                <Menu vertical size={"large"}>

                    <Menu.Item
                        className={"firstMenu"}
                        size="large"
                        inverted
                        fixed="left"
                        vertical
                        style={{
                            height: "890px",
                            width: "300px",
                            background: "#2ca5ca",
                            fontSize: "1.2rem",
                            textAlign: "center"

                        }}
                    >
                        <label><b><h1>WOMAVS</h1></b></label>
                        <Channels />
                    </Menu.Item>
                </Menu>
            </Col>

            //<Col md={1}>Side Panel</Col>
        )
    }
}

export default SidePanel;