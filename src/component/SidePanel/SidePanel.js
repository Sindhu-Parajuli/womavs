import React, {useEffect, useState} from 'react';
import {Row, Col} from "react-bootstrap";
import {Input, Label, Menu} from 'semantic-ui-react'
import Channels from "./Channels";
import "./SidePanel.css";
import { useHistory } from "react-router-dom";
import Sidebaroptions from "./Sidebaroptions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import firebase from "../../firebase";
import {useStateValue} from "../../StateProvider";
//import {Menu, Icon, Modal, Form, Input, Button} from "semantic-ui-react";


function SidePanel ()
{
    const [channels, setchannels] = useState([]);
    const [{user}] = useStateValue();

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



    return (
            <div className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__info">
                        <h2>WOMAVS</h2>

                        {/*<Channels/>*/}
                    </div>

                </div>


                <hr />
                <Sidebaroptions Icon={AddIcon} addChannelOption title="Add Channel" />

                {/* Connect to dB and list all the channels */}
                {/* <SidebarOption ... /> */}
                {channels.map((channel) => (
                    <Sidebaroptions title={channel.name} id={channel.id} />
                ))}


            </div>


        );

}

export default SidePanel;