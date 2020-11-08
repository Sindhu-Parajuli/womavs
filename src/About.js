import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import capture from "./images/Capture.PNG";
import "./About.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";


const About = () => {
    const history = useHistory()
    const redirectToAnnouncementPage =() =>{
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
    const redirectToAboutUsPage = () => {
        history.push("/about")
    }

    const signout = () => {
        firebase.auth().signOut().then(() => {
                //this.store.dispatch('clearData')
                history.push("/Signin");
            }
        );
    }
    return (
        <div >
            <nav className="navbar navbar bg-blue" style={{background: "rgb(0,100,177)"}}>
                <a className="navbar-brand" href="#">
                    <img src={capture} width="60" height="60"/>
                </a>

                <div className="topnav" id="myTopnav" style={{width: 800, margin: '0 auto'}}>
                    <a href="/homepage">Home</a>
                    <a onClick={redirectTochatroomPage}>Chatrooms</a>
                    <a onClick={redirectToAnnouncementPage }>Announcement</a>
                    <a onClick={redirectToResourcesPage}>Resources</a>
                    <a onClick={redirectToProfilePage}>My Account</a>
                    <a onClick={signout}>Logout</a>
                    <a onClick={redirectToAboutUsPage}>About Us</a>


                </div>
            </nav>

            <div className={"background_image"}>
                <div className={"text-center"}>
                    <img className={"rounded mx-auto d-block"} src={capture}/>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <hr style={{height: 20, background: "#0064b1", marginBottom: 0}}/>
                        <hr style={{height: 20, background: "rgb(245,128,38)", marginTop: 0, marginBottom: 0}}/>
                        <hr style={{height: 20, background: "rgb(250,250,250)", marginTop: 0}}/>
                    </div>
                </div>
                <div className={"text-center"}>
                    <h1> Vision </h1>
                    <h2>In this time of social isolation, we need social networks more than ever. The goal of this
                        application is to provide women UTA Mavericks with a lifeline to each other. This application
                        will provide female students with the opportunity to share and care through sharing posts,
                        mentorship, and supporting each other.</h2>
                    <h1 style={{marginBottom: 2}}>The Team</h1>
                    <h2 style={{marginTop: 2, marginBottom: 2}}>Sindhu Parajuli</h2>
                    <h2 style={{marginTop: 2, marginBottom: 2}}>Nishan Thapa</h2>
                    <h2 style={{marginTop: 2, marginBottom: 2}}>Miracle Omoloja</h2>
                    <h2 style={{marginTop: 2, marginBottom: 2}}>Inara Rupani</h2>
                </div>
            </div>
        </div>
    );
}
export default About;