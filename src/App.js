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

    const [acc, setacc] = useState('');
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [eError, seteError] = useState('');
    const [pError, setpError] = useState('');
    const [exists, setExists] = useState('false');
    const [success] = useState('false');

    const redirectToLoginPage = () => {
        history.push("/Signin")
    }


    const signup = () => {

        //clearing errors
        seteError("");
        setpError("");
        if (pass.length < 6) setpError("Password too weak");
        if (email.includes("uta.edu")) {
            fire.auth().createUserWithEmailAndPassword(email, pass).then(
                history.push("/dashboard")
            ).catch(err => {
                switch (err.code) {
                    case "auth/email-already-exists":
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

    const logout = () => {
        fire.auth().signOut();

    }

    const checkUser = () => {
        fire.auth().onAuthStateChanged((acc) => {
            if (acc) {
                setacc("" + acc);

                // setting email and password to null, if user exists
                setemail("");
                setpass("");
                setName("");

            } else setacc("");

        })

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
                      checkUser={checkUser}
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
