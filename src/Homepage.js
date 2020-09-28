import capture from "./images/Capture.PNG";
import React from "react";
import App from "./App";
import hdr from "./css/hdr.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";

const Homepage=(logout)=>{
    const history = useHistory();

    const lout = () => {
       firebase.auth().signOut().then(history.push("/Signin"));


    }

    return(

<div>
    <nav className="navbar navbar-default" style={{background:"rgb(0,100,177)"}}>
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left" alt="..."/></a>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><a href="/dashboard" style={{color:"white"}}>Home</a></li>
                <li><a href="/chatrooms"  style={{color:"white"}}>Chatrooms</a></li>
                <li><a href="/resources" style={{color:"white"}}>Resources</a></li>
                <li><a onClick={lout} style={{color:"white"}}>Logout</a></li>

            </ul>
        </div>
    </nav>
</div>
);
}
export default Homepage;