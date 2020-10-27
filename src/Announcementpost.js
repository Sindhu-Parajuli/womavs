import capture from "./images/Capture.PNG";
import propic from "./images/default.PNG"
import React, {useEffect, useState} from "react";
import App from "./App";
import hp from "./css/hp.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import {Navbar,Nav} from "react-bootstrap";
import {Avatar} from "@material-ui/core";


const AnnouncementPost = ({username, timestamp, userImage,post,title}) =>{

    return(
        <div className="post_body">
            <div className="card px-3 py-4 " style={{marginTop: 20}}>
                <div className={"row"} style={{marginLeft:5}}>
                    <Avatar src={userImage}></Avatar>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div id={"post_header"} >

                    <h4>{username}</h4>

                </div>
                <hr style={{background: "#0064b1"}}/>
                <div id={"post_header"} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 40,
                    width: 200
                }}>

                    <h2>{title}</h2>

                </div>
                <hr style={{  background: "rgb(245,128,38)" }}/>
                    <div id={"post_header"} >
                        <h4>{post}</h4>
                    </div>


            </div>

        </div>
    );
}
export default AnnouncementPost;