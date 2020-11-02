import capture from "./images/Capture.PNG";
import propic from "./images/default.PNG"
import React, {useEffect, useState} from "react";
import App from "./App";
import hp from "./css/hp.css"
import firebase from "./firebase.js";
import {Navbar,Nav} from "react-bootstrap";
import {Avatar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Comment, CommentContent, CommentGroup} from "semantic-ui-react";


const Post = ({pst_id,username, timestamp, userImage,post}) =>{

    const history= useHistory();
    const [cmnts,setCmnts]=useState([]);
    const[row,setRow]=useState("");

    useEffect(() => {
        let sbc;

        if(pst_id)
        {
            sbc = firebase.firestore().collection("posts").doc(pst_id).collection("comments")
                .onSnapshot((snapshot) => {
                    setCmnts(snapshot.docs.map((doc) => doc.data()))

                });
        }
        return()=>{
            sbc();
        };

    },[pst_id]);



   // const redirectToComments = () => {
     //   history.push("/comment")
    //}

    const saveComm=(evnt)=>{

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection("posts").doc(pst_id).collection('comments').add({
                    message: row,
                    tstamp: firebase.firestore.FieldValue.serverTimestamp(),
                    // userimage: usr.photoURL,
                    username: usr.displayName,
                })
                setRow('');
            }

        })
    }

    return(
        <div className="post_body">
            <div className="card px-3 py-4 " style={{marginTop: 20}}>
                <div className={"row"} style={{marginLeft:5}}>
                    <Avatar src={userImage}></Avatar>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div id={"post_header"}>
                    <h1>{username}</h1>
                    <p>{post}</p>
                </div>


                <form style={{ marginTop:20}}>
                    <input  type="text" required value={row} style={{blockSize:25}}
                           onChange={(e) => setRow(e.target.value)}
                           placeholder="Add a comment"/>
                    <button type="submit" style={{background: "rgb(0,100,177)"}} onClick={saveComm}>Comment</button>
                </form>


                {<div style={{background: "rgb(220,220,220)", marginTop:20}}>
                    {
                        cmnts.map((cmnt)=>(
                            <CommentGroup>
                                <Comment style={{background:"rga(220,220,220)"}}>
                                    <CommentContent>
                                        <Comment.Author>{cmnt.username}
                                            <Comment.Metadata>{new Date(cmnt.tstamp?.toDate()).toUTCString()}</Comment.Metadata>
                                        </Comment.Author>
                                        <Comment.Text>{cmnt.message}</Comment.Text>
                                    </CommentContent>
                                    <hr
                                        style={{height: 5}}
                                    />
                                </Comment>
                            </CommentGroup>
                        ) ) }

                </div>
                }

            </div>



        </div>
    );
}
export default Post;