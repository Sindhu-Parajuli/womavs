import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Chatroom.css";
import {Row, Col} from "react-bootstrap";
import SidePanel from "./component/SidePanel/SidePanel";
import ColorPanel from "./component/ColorPanel/ColorPanel";
import Messages from "./component/Messages/Messages";
import MetaPanel from "./component/MetaPanel/MetaPanel";
import MessagesHeader from "./component/Messages/MessagesHeader";
import MessageForm from "./component/Messages/MessageForm";
import Navigation from "./Navbar"



function Chatroom  () {
    return (
        <div className="appss">
            <Navigation/>
            <div className="appss__body">
            <SidePanel/>
            <Messages/>

        </div>
        </div>

    );
}

export default Chatroom;