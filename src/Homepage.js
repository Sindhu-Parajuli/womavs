import capture from "./images/Capture.PNG";
import React from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase";

const Homepage=(logout)=>{
    const history = useHistory();

    const signout = () => {
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
                <li className="active"><a href="/homepage" style={{color:"white"}}>HOME</a></li>
                <li><a href="/chatrooms"  style={{color:"white"}}>CHAT ROOMS</a></li>
                <li><a href="/resources" style={{color:"white"}}>RESOURCES</a></li>
                <li><a onClick={signout} style={{color:"white"}}>LOGOUT</a></li>

            </ul>
        </div>
    </nav>
</div>
);
}
export default Homepage;