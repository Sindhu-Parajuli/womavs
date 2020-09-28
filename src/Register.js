import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import soc from './images/socialize.png'
import ct from './images/chatrooms.jpeg'
import men from './images/mentor.jpg'
import metoo from './images/me too.jpg'
import Signin from "./Signin";
import {Router, Switch, Route, Link} from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import {useHistory} from 'react-router-dom';

const Register = (props) => {
    console.log(props)
    const {email, setemail, pass, setpass, name, setName, login, signup, eError, pError, success} = props;
    const history = useHistory();
    console.log(history)


    return (

        <div>
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
                           onChange={(e) => setpass(e.target.value)}
                           placeholder="Enter Password"/>
                    <p className={"errorMsg"} style={{color: "red"}}>{pError}</p>

                </div>

                <div className="row px-3 mb-4">
                    <div className="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"
                               style={{textAlign: "center", position: "absolute", right: 175}}/>
                        <label htmlFor="vehicle3">By Signing Up, I agree I am a female UTA student.</label><br/>
                    </div>

                </div>
                <div className="row mb-3 px-3">
                    <button className="btn btn-blue text-center"
                            onClick={signup
                            }
                    >Register
                    </button>
                </div>

                <div className="row mb-4 px-3">
                    <small className="font-weight-bold">Already a User?
                        <button
                                className="text-danger" type={"button"} onClick={login}>Login</button></small></div>
            </div>
        </div>
        </div>

    );

}


export default Register;