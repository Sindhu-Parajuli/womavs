import capture from "./images/Capture.PNG";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";



const Navigation = ()=>{
    const height= window.screen.height;
    const width= window.screen.width;
    const history = useHistory();
    const [admins,setAdmins] = useState('')
    const [admin,setStatus] = useState(0)
    const [email,setEmail] = useState('')


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                //grabs posts items from database and places them in our  post array
                firebase.firestore().collection('admins')
                    .onSnapshot((snapshot) =>{
                        setAdmins(snapshot.docs.map((doc) => doc.data()))
                        setEmail(usr.email)
                    })


            }
        })
        console.log(admins)
        var e;
        for (e of admins){
            console.log(e)
            if(email === e.email){
                setStatus(1)
            }
        }

        return
    },[email])

    const redirectToAnnouncementPage = () => {
        history.push("/announcement")
    }

    const redirectTochatroomPage = () => {
        history.push("/chatroom")
    }

    const redirectToProfilePage = () => {
        history.push("/profile")
    }
    const redirectToResourcesPage = () => {
        history.push("/resources")
    }
    const redirectToAboutUsPage = () =>{
        history.push("/about")
    }
    const redirectToAdminPage = () => {
        history.push("/admin")
    }

    const check =() =>
    {
        const r = window.confirm("Do you really want to Sign Out?");
        if(r == true)
        {
            {signout()}
        }
        else
        {
            window.close();
        }
    }

    const signout = () => {

        firebase.auth().signOut().then(()=>{

                history.push("/signin");
            }

        );
    }
    return(
        <nav className="navbar navbar bg-blue" style={{background: "rgb(0,100,177)"}}>
            <a className="navbar-brand" href="#">
                <img src={capture} width="60" height="60"/>
            </a>

            <div className="topnav" id="myTopnav" style={{width: "80%", margin: '0 auto'}}>
                <a href="/homepage">Home</a>
                <a onClick={redirectTochatroomPage}>Chatrooms</a>
                <a onClick={redirectToAnnouncementPage}>Announcement</a>
                <a onClick={redirectToResourcesPage}>Resources</a>
                <a onClick={redirectToProfilePage}>My Account</a>
                <a onClick={check}>Logout</a>
                <a onClick={redirectToAboutUsPage}>About Us</a>
                {admin == 1 ?(
                    <a style={ {color:"rgb(143,33,39)"}}
                       onClick={redirectToAdminPage}>Admin</a>

                ):(<div/>)}


            </div>
        </nav>


    );
}
export default Navigation;