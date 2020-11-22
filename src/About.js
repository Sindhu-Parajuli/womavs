import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import capture from "./images/Capture.PNG";
import "./css/About.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";
import Navigation from "./Navbar"

const About = () => {
    const history = useHistory()


    const signout = () => {
        firebase.auth().signOut().then(() => {
                //this.store.dispatch('clearData')
                history.push("/Signin");
            }
        );
    }
    return (
        <div>
            <Navigation/>

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
                    <h1 style={{color: "rgb(234,222,212)", background: "#0064b1",}}> Vision </h1>
                    <h2 style={{background: "rgb(245,128,38)",}}>In this time of social isolation, we need social
                        networks more than ever. The goal of this
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