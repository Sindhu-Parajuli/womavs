import React, {useState} from "react";

import 'bootstrap/dist/css/bootstrap.css'
import soc from './images/socialize.png'
import ct from './images/chatrooms.jpeg'
import men from './images/mentor.jpg'
import metoo from './images/me too.jpg'
import Register from "./Register";
import firebase from "./firebase.js";
import {useHistory} from "react-router-dom";
import capture from "./images/Capture.PNG";




const Signin = () => {

    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [acc, setacc] = useState('');
    const [name, setName] = useState('');
    const [eError, seteError] = useState('');
    const [pError, setpError] = useState('');
    const [exists, setExists] = useState('false');
    const [success] = useState('false');
    const history = useHistory();

    const redirectToPage = () => {
        history.push("/")
    }

    const login = () => {
        //clearing errors
        seteError("");
        setpError("");

        if (email && pass) {
            //This is not working, the signin with email and password part. Every random email and password goes through this
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(err => {

                switch (err.code) {

                    //email errors
                    case "auth/invalid-email": //check if email is invalid
                    case "auth/user-not-found": //check if user doesnot exist
                        seteError(err.message);
                        break;

                    //password errors
                    case  "auth/invalid-password":   //check for wrong password
                        setpError(err.message);
                        break;
                }

            })

            firebase.auth().onAuthStateChanged((usr) => {
                if (usr) {
                    history.push("/dashboard")

                    // setting email and password to null, if user exists
                    setemail("");
                    setpass("");
                    setName("");

                } else setacc("");

            })

        } else seteError("Email and Password field required")


    }

    return (
       <div>

           <div className="hdr">
               <header>
                   <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left" alt="..."/>
                   <h1 id={"head"}>Community For Female Mavericks</h1>
               </header>

           </div>
        <div className="row d-flex" style={{background: "rgb(236,240,241)"}}>
            <div className="col-lg-6">

                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">

                    <img src={soc} className="image"
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={men} className="image"
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={ct} className="image"
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={metoo} className="image"
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>


                </div>
            </div>

            <div className="card2 card border-0 px-4 py-5">
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="">Email Address</h6>
                    </label>
                    <input className="mb-4" type="text" name="email" required value={email}
                           onChange={(e) => setemail(e.target.value)}
                           placeholder="Enter your UTA email"/>
                    <p className={"errorMsg"}
                       style={{color: "red"}}>{eError}</p>
                </div>


                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                    </label>
                    <input type="password" name="password" required value={pass}
                           onChange={(e) => setpass(e.target.value)}
                           placeholder="Enter Password"/>
                    <p className={"errorMsg"} style={{color: "red"}}>{pError}</p>

                </div>


                <div className="row mb-3 px-3">
                    <button className="btn btn-blue text-center"
                            onClick={login}
                    >Login
                    </button>


                    <a href="/forgot"  style={{color:"black"}}>Forgot Password?</a>

                </div>
                <div className="row mb-4 px-3"><small className="font-weight-bold">Not a User yet? <button
                    className="text-danger " onClick={redirectToPage}>Register</button></small></div>
            </div>
        </div>
       </div>

    );

}

export default Signin;