import React, {useState} from "react";

import 'bootstrap/dist/css/bootstrap.css'
import Register from "./Register";
import firebase from "./firebase.js";
import {useHistory} from "react-router-dom";
import womavs from "./images/Capture.PNG";

const ForgotPassword  = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [code, setcode] = useState('');
    const [eError, seteError] = useState('');
    const [pError, setpError] = useState('');
    const [cError, setcError] = useState('');
    const [reset, setStep] = useState(0);
    const [success] = useState('false');
    const history = useHistory();

    const redirectToPage = () => {
        history.push("/")
    }

    const resetpassword = () => {
        console.log(email)
        //clearing errors
        seteError("");
        if(email){
            firebase.auth().sendPasswordResetEmail(
                email, null)
                .then(function () {
                    history.push("/signin");
                    // Password reset email sent.
                })
                .catch(function (error) {
                    switch (error.code) {

                        //email errors
                        case "auth/invalid-email": //check if email is invalid
                        case "auth/user-not-found": //check if user doesnot exist
                            seteError(error.message);
                            break;

                    }

                });
        }}





    return (
        <div>
            <div className="hdr">
                <header>
                    <img id={"lo"} src={womavs} height={75} width={100} className="rounded float-left" alt="..."/>
                    <h1 id={"head"}>Community For Female Mavericks</h1>
                </header>

            </div>
            <div className="row d-flex" style={{background: "rgb(236,240,241)"}}>
                <div className="col-lg-6">

                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line">

                        <img src={womavs} className="image"
                             style={{marginBottom: 20, marginRight: 50, height: 200, width: 200}}/>

                    </div>
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
                    <div className="row mb-3 px-3">
                        <button className="btn btn-blue text-center"
                                onClick={resetpassword}
                        >Reset Password
                        </button>
                    </div>
                </div>
                    <div className="row mb-4 px-3"><small className="font-weight-bold">Not a User yet? <button
                        className="text-danger " onClick={redirectToPage}>Register</button></small>
                    </div>
        </div>
                );
}

export default ForgotPassword;