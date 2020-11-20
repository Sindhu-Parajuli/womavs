import React from 'react'
import {Header , Segment , Input , Icon} from 'semantic-ui-react'
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from "@material-ui/core";
import "./MessagesHeader.css";
import {useHistory} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import firebase from "../../firebase.js";
function MessagesHeader()  {
    const history = useHistory();
    const [{ user }] = useStateValue();
    console.log(user)

    const Signout = () => {
        firebase.auth().signOut().then(history.push("/Signin"));
    }

    return (
        <div className="header">
            <div className="header__left">
                <Avatar
                    className="header__avatar"
                    alt={user?.displayName}
                    src={user?.photoURL}
                />
                <AccessTimeIcon />
            </div>
            <div className="header__search">
                <SearchIcon />
                <input placeholder="Search womavs" type="text" />
            </div>
            <div className="header__call">
                <CallIcon />

            </div>


            <div className="header__right">
                <HomeIcon onClick={() => {
                    history.push("/Homepage")
                }}/>
            </div>

            <div className="header__rights">
                <ExitToAppIcon onClick={Signout}

                />
            </div>


        </div>
    );



}
export default MessagesHeader;