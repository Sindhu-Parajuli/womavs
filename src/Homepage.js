import capture from "./images/Capture.PNG";
import propic from "./images/default.PNG"
import React, {useEffect, useState} from "react";
import App from "./App";
import hdr from "./css/hdr.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";




const Homepage=(logout)=>{
    const height= window.screen.height;
    const width= window.screen.width;
    const history = useHistory();
    const[user,setUser]=useState(firebase.auth().currentUser);

        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                // User is signed in.
                setUser(u=>usr);
                //const image = firebase.storage().ref(`images/${user.uid}`);

                //image.getDownloadURL().then((url) =>   { document.getElementById("li").scr = url} );



                console.log("Username")
                console.log(usr)


            } else {
                // No user is signed in.
                signout()
            }
        })



    const signout = () => {
       firebase.auth().signOut().then(history.push("/Signin"));
    }

    const redirectTochatroomPage = () => {
        history.push("/Chatroom")
    }
    console.log(user);



        return(
<div>
    {user?(
        <div>
    <nav className="navbar navbar-default" style={{background:"rgb(0,100,177)"}}>
        <div className="container-fluid">
            <div>
                <img id={"lo"} src={capture} style={{marginLeft:width-(width/2),marginTop:5}} height={75} width={100} alt="..."/>
                <div className="col-lg-11" style={{marginBottom:0}}>

                        <a href={"/profile"} style={{color:"white"}}><img id={"li"} src={user.photoURL} style={{borderRadius:4,borderColor:"green",marginTop:5,borderWidth:4}} height={60} width={70} alt="..."/>
                            <p>{user.displayName}</p></a>

</div>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><a href="/homepage" style={{color:"white"}}>Home</a></li>

                <li><a onClick={redirectTochatroomPage}  style={{color:"white"}}>Chatrooms</a></li>
                <li><a href="/resources" style={{color:"white"}}>Resources</a></li>
                <li><a onClick={signout} style={{color:"white"}}>Logout</a></li>

            </ul>
        </div>
    </nav>
    </div>
    ):(<div><h1>User is null?</h1></div>)}
    </div>
);
}
export default Homepage;