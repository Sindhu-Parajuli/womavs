import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import firebase from "./firebase.js";
import {useHistory} from "react-router-dom";
import womavs from "./images/Capture.PNG";
import lectureroom from "./images/pexels-pixabay-207691.jpg"

const ForgotPassword = () => {

    const [email, setemail] = useState('');
    const [eError, seteError] = useState('');
    const history = useHistory();

    //Will have change url when we get this hosted
    const actionCodeSettings = {
        url: 'http://localhost:3000/homepage',
        handleCodeInApp: true
    };
    const redirectToPage = () => {
        history.push("/")
    }
    //once user clicks button reset button call this button
    const resetpassword = () => {
        console.log(email)
        //clearing errors
        seteError("");
        if (email) {
            firebase.auth().sendPasswordResetEmail(
                email, actionCodeSettings)
                .then(function () {
                    // Password reset email sent.
                    alert("Reset link sent to email")
                })
                .catch(function (error) {
                    switch (error.code) {
                        //email errors
                        case "auth/invalid-email": //check if email is invalid
                            seteError(error.code);
                            break;
                        case "auth/user-not-found": //check if user does not exist
                            seteError(error.code);
                            break;
                        default:

                    }

                });
        }
    }

    return (
        <div>
            <div className="hdr">
                <header>
                    <img id={"lo"} src={womavs} height={75} width={100} className="rounded float-left" alt="..."/>
                    <h1 id={"head"}>Community For Female Mavericks</h1>
                </header>
            </div>
            <div class="card text-center">
                <div class="card-header justify-content-center">
                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                        <img src={lectureroom} className="image"
                             style={{height: 350, width: 800}} alt="..."/>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Reset Password</h5>
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
                        <div className="row mb-4 px-3" style={{marginLeft: 5}}>
                            <small className="font-weight-bold">Not a User yet? <button
                                className="text-danger " onClick={redirectToPage}>Register</button></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;