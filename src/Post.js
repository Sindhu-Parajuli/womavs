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
    const [hidecom,setHidecom]=useState(false)
    const history= useHistory();
    const [cmnts,setCmnts]=useState([]);
    const[row,setRow]=useState("");
    const changeHide=()=>{
        setHidecom(true);
    }

    const changeHideFalse=()=>{
        setHidecom(false);
    }

    useEffect(() => {
        let sbc;

        if(pst_id)
        {
            sbc = firebase.firestore().collection("posts").doc(pst_id).collection("comments").orderBy("tstamp","asc")
                .onSnapshot((snapshot) => {
                    setCmnts(snapshot.docs.map((doc) => doc.data()))

                });
        }
        return()=>{
            sbc();
        };

    },[pst_id]);





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
                <ul className="list-group">
                {!hidecom ? <button className="btn float-Center" style={{
                    display: 'flex',
                    background: "rgb(0,100,177)",
                    justifyContent: 'center',
                    marginTop:10,
                    alignSelf: 'center',
                    height: 40,
                    width: 200
                }}
                onClick={changeHide}><b>Comment</b>
                </button>:null}
                </ul>

                {hidecom ? <form  style={{ marginTop:20}}>
                    <hr
                        style={{width:1100}}
                    />
                    <input  type="text"  required value={row} style={{blockSize:25}}
                           onChange={(e) => setRow(e.target.value)}
                           placeholder="Add a comment"/>
                    <button type="submit" style={{background: "rgb(0,100,177)"}} onClick={saveComm}>Comment</button>
                    <button type="submit" style={{background: "red"}} onClick={changeHideFalse}>Cancel</button>
                    </form>:null}


                {hidecom ? <div style={{background: "rgb(220,220,220)", marginTop: 20}}>
                    {
                        cmnts.map((cmnt) => (
                            <CommentGroup>
                                <Comment style={{background: "rga(220,220,220)"}}>
                                    <CommentContent>
                                        <Comment.Author>{cmnt.username}
                                            <Comment.Metadata>{new Date(cmnt.tstamp?.toDate()).toUTCString()}</Comment.Metadata>
                                        </Comment.Author>
                                        <Comment.Text>{cmnt.message}</Comment.Text>
                                    </CommentContent>
                                    <hr
                                        style={{width:800}}
                                    />
                                </Comment>
                            </CommentGroup>
                        ))}

                </div>:null
                }


            </div>



        </div>
    );
}
export default Post;