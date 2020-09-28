import React, {useState, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import firebase from "./firebase.js";
import Register from "./Register";
import hdr from "./css/hdr.css"
import ReactDOM from "react-dom";
import capture from "./images/Capture.PNG";
import Homepage from "./Homepage";
import Signin from "./Signin";
import {useHistory} from "react-router-dom";

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
