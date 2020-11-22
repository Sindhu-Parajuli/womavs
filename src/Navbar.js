import capture from "./images/Capture.PNG";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";




const Navigation = ()=>{
    const height= window.screen.height;
    const width= window.screen.width;
    const history = useHistory();

    const redirectToAnnouncementPage = () => {
        history.push("/announcement")
    }


    const redirectTochatroomPage = () => {
        history.push("/chatroom")
    }

    const redirectToProfilePage = () => {
        history.push("/profile")
    }
    const redirectToResourcesPage = () => {
        history.push("/resources")
    }
    const redirectToAboutUsPage = () =>{
        history.push("/about")
    }


    const signout = () => {

        firebase.auth().signOut().then(()=>{
                //this.store.dispatch('clearData')
                history.push("/Signin");
            }

        );
    }
    return(
        <nav className="navbar navbar bg-blue" style={{background: "rgb(0,100,177)"}}>
            <a className="navbar-brand" href="#">
                <img src={capture} width="60" height="60"/>
            </a>

            <div className="topnav" id="myTopnav" style={{width: 800, margin: '0 auto'}}>
                <a href="/homepage">Home</a>
                <a onClick={redirectTochatroomPage}>Chatrooms</a>
                <a onClick={redirectToAnnouncementPage}>Announcement</a>
                <a onClick={redirectToResourcesPage}>Resources</a>
                <a onClick={redirectToProfilePage}>My Account</a>
                <a onClick={signout}>Logout</a>
                <a onClick={redirectToAboutUsPage}>About Us</a>


            </div>
        </nav>

    );
}
export default Navigation;