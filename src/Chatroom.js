import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Navigation from "./Navbar";
import "./Chatroom.css";
import {Row, Col} from "react-bootstrap";
import SidePanel from "./component/SidePanel/SidePanel";
import ColorPanel from "./component/ColorPanel/ColorPanel";
import Message from "./component/Messages/Messages";
import MetaPanel from "./component/MetaPanel/MetaPanel";

const Chatroom = () => (

    <Row>
        <SidePanel/>


        <Message/>


    </Row>


);

export default Chatroom;
