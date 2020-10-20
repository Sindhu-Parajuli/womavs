import capture from "./images/Capture.PNG";
import propic from "./images/default.PNG"
import React, {useEffect, useState} from "react";
import App from "./App";
import hp from "./css/hp.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import {Navbar,Nav} from "react-bootstrap";
import {Avatar} from "@material-ui/core";


const Post = ({username, timestamp, userImage,post}) =>{

    return(
        <div className="post_body">
            <div className="card px-3 py-4 " style={{marginTop: 20}}>
                    <div className={"row"} style={{marginLeft:5}}>
                        <Avatar src={userImage}></Avatar>
                        <p>timestamp</p>
                    </div>
                    <div id={"post_header"}>
                    <h1>{username}</h1>

                        <p>{post}</p>
                    </div>
                        <ul className="list-group">
                        <button className="btn float-Center" style={{
                            display: 'flex',
                            background: "rgb(0,100,177)",
                            justifyContent: 'center',
                            alignSelf: 'center',
                            height: 40,
                            width: 200
                        }}
                        >Comment
                        </button>

                    </ul>
                </div>

        </div>
    );
}
export default Post;