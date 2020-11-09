import React, {useState, Component} from 'react';
import ReactBootstrapCarousel from "react-bootstrap-carousel"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import firebase from "./firebase.js";
import Register from "./Register";
import hdr from "./css/hdr.css"
import ReactDOM from "react-dom";
import capture from "./images/Capture.PNG";
import Homepage from "./Homepage";
import Resources from "./Resources";
import Signin from "./Signin";
import {useHistory} from "react-router-dom";
import {Carousel} from "react-bootstrap";

const App = () => {

    const history = useHistory();

    return (
        <div>
            <div className="hdr">
                <header>
                    <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left" alt="..."/>
                    <h1 id={"head"}>Community For Female Mavericks</h1>
                </header>

            </div>
            <Register/>
        </div>


    );
}

export default App;
