import capture from "./images/Capture.PNG";
import propic from "./images/default.PNG"
import React, {useEffect, useState} from "react";
import App from "./App";
import hp from "./css/hp.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import {Navbar, Nav} from "react-bootstrap";
import {Avatar, Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ReportIcon from "@material-ui/icons/Report";


const AnnouncementPost = ({username, timestamp, userImage, post, title, id, email}) => {

    const[open,setOpen]=useState(false);
    const[rcomment,setReportComment] = useState("")

    const handleReport=()=>{

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                const docRefc =  firebase.firestore().collection("reports").doc("M0x2Pis5urIIewEg3eVA").collection('postsreported').doc(id)
                docRefc.set({email:email,id:id,is_comment:0})
                docRefc.get().then(function (response) {
                })


                firebase.firestore().collection("reports").doc("M0x2Pis5urIIewEg3eVA").collection('postsreported').doc(id)
                    .collection("complaints").add({
                    comment: rcomment,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    email: email,
                    postId: id,
                    commentId:""
                })


                const docRef = firebase.firestore().collection("watchList").where("email", "==", email)

                docRef.get().then(function(response){

                    if(!response.empty){

                        response.docs.forEach((doc) => {
                                firebase.firestore().collection("watchList").doc(doc.id).update({
                                    strikes: firebase.firestore.FieldValue.increment(1)});
                            }
                        )}
                    else
                    {
                        firebase.firestore().collection("watchList").add({
                            email: email,
                            strikes: 1
                        })
                    }


                })
            }
        })


    }
    const handleReportComment = (e) => {
        if (e.target.value) {
            setReportComment(e.target.value)
        }
    };

    return (<div><Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Report User {username}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Comment on report
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Comment"
                    fullWidth
                    onChange={handleReportComment}
                />

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button color="primary" onClick={() => {
                    handleReport();
                    setOpen(false)
                }}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
            <div className="post_body">
                <div className="card px-3 py-4 " style={{marginTop: 20}}>
                    <div style={{width: "50%", paddingLeft:"85%" }}>
                        <ReportIcon titleAccess={"Report User"} fontSize={"large"} style={{color: "rgb(239,145,44)"}} onClick={()=>setOpen(true) }></ReportIcon>
                    </div>
                    <div className={"row"} style={{marginLeft: 5}}>
                        <Avatar src={userImage}></Avatar>
                        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                    </div>
                    <div id={"post_header"}>

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
                    <hr style={{background: "rgb(245,128,38)"}}/>
                    <div id={"post_header"}>
                        <h4>{post}</h4>
                    </div>


                </div>

            </div>
        </div>
    );
}
export default AnnouncementPost;