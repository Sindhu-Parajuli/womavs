import React, {useState, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import fire from "./fire";
import Register from "./Register";
import hdr from "./css/hdr.css"
import ReactDOM from "react-dom";
import capture from "./images/Capture.PNG";
import Dashboard from "./dashboard";
import Signin from "./Signin";
import {useHistory} from "react-router-dom";

const App = () => {
    const history = useHistory();


    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [eError, seteError] = useState('');
    const [pError, setpError] = useState('');


    const redirectToLoginPage = () => {
        history.push("/Signin")
    }


    const signup = () => {

        //clearing errors
        seteError("");
        setpError("");
        if (pass.length < 6) setpError("Password must be 6 characters.");
        if (email.includes("uta.edu")) {
            fire.auth().createUserWithEmailAndPassword(email, pass).then(
                history.push("/dashboard")
            ).catch(err => {
                switch (err.code) {
                    case "auth/email-already-exists":
                        seteError(err.message)
                        break;
                    case "auth/invalid-email":
                        seteError(err.message);
                        break;
                    case "auth/weak-password":
                        setpError(err.message);
                        break;


                }
            })
        } else seteError("UTA email required.")
    }




    return (
        <div>
            <div className="hdr">
                <header>
                    <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left" alt="..."/>
                    <h1 id={"head"}>Community For Female Mavericks</h1>
                </header>

            </div>
            <Register email={email} setemail={setemail} pass={pass} setpass={setpass} name={name} setName={setName}
                      login={redirectToLoginPage} signup={signup}
                      eError={eError} pError={pError}
            >
            </Register>

            {/*
            <Signin></Signin>
*/}

        </div>


    );
}

export default App;
