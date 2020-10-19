import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import soc from './images/socialize.png'
import ct from './images/chatrooms.jpeg'
import men from './images/mentor.jpg'
import metoo from './images/me too.jpg'
import Signin from "./Signin";
import {Router, Switch, Route, Link} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App"
import firebase from "./firebase"
import {useHistory} from 'react-router-dom';
import {Checkbox,FormGroup, FormControlLabel,FormControl} from '@material-ui/core';
import "./Register.css"
const Register = (props) => {
    console.log(props)
    const history = useHistory();
    console.log(history)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [checkbox, setCheck] = useState({
        femaleAgr:false
    });


    const [eError, seteError] = useState('');
    const [pError, setpError] = useState('');
    const [cError, setcError] = useState('');


    const redirectToSigninPage = () => {
        history.push("/Signin")
    }

//check input values for errors when users click sign up/register button
    const signup = () => {
        //clearing errors
        seteError("");
        setpError("");
        setcError("")
        var errorcheck = false;
        //password error check
        if (pass.length < 6) {
            setpError("Password must be at least 6 characters.");
            errorcheck=true;
            console.log(errorcheck)
        }
        //checkbox error check
        if(checkbox.femaleAgr === false) {
            setcError("Agreement terms must be met to register.")
            errorcheck=true;
        }
        //email errorcheck
        if (email.includes("uta.edu")) {
            if( errorcheck === false){
                firebase.auth().createUserWithEmailAndPassword(email, pass)
                    .then(function ()
                        {
                            history.push("/homepage")

                        }
                    )
                    .catch(err => {
                    console.log(err.code)
                    switch (err.code) {
                        case "auth/email-already-in-use":
                            seteError(err.message)
                            break;
                        case "auth/invalid-email":
                            seteError(err.message);
                            break;
                        case "auth/weak-password":
                            setpError(err.message);
                            break;
                    }
                })}

        } else seteError("UTA email required.")
    }


//get new bool when the checkbox is checked or not
    const checkboxChange = (event) => {
        setCheck({ ...checkbox, [event.target.name]: event.target.checked });

    };

    return (

        <div>
        <div className="row d-flex" style={{background: "rgb(236,240,241)"}}>
            <div className="col-lg-6">

                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">

                    <img src={soc} className="image" alt="..."
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={men} className="image" alt="..."
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={ct} className="image" alt="..."
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>
                    <img src={metoo} className="image" alt="..."
                         style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>


                </div>
            </div>

            <div className="card2 card border-0 px-4 py-5">
                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="">Email Address</h6>
                    </label>
                    <input className="mb-4" type="text" name="email" required value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your UTA email"/>
                    <p className={"errorMsg"}
                       style={{color: "red"}}>{eError}</p>
                </div>


                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="">Username</h6>
                    </label>
                    <input className="mb-4" type="text" required value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Enter your Username"/>
                </div>


                <div className="row px-3">
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                    </label>
                    <input type="password" name="password" required value={pass}
                           onChange={(e) => setPass(e.target.value)}
                           placeholder="Enter Password"/>
                    <p className={"errorMsg"} style={{color: "red"}}>{pError}</p>
                </div>

                <div className="row px-3 mb-4">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                required={true}
                                checked={checkbox.femaleAgr}
                                name={"femaleAgr"}
                                control={<Checkbox color="primary" />}
                                label="By signing up, I agree I am a female UTA student."
                                labelPlacement="end"
                                onChange={checkboxChange}
                            />

                        </FormGroup>
                </div>
                <p className={"errorMsg"} style={{color: "red"}}>{cError}</p>

                <div className="row mb-3 px-3">
                    <button className="btn btn-blue text-center"
                            onClick={signup}
                    >Register
                    </button>
                </div>

                <div className="row mb-4 px-3">
                    <small className="font-weight-bold">Already a User?
                        <button
                                className="text-danger" type={"button"} onClick={redirectToSigninPage}>Login</button></small></div>
            </div>
        </div>
        </div>

    );

}


export default Register;