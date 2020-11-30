import ReportIcon from "@material-ui/icons/Report";
import {Avatar, Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import firebase from "./firebase.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import ReportPost from "./ReportPost";
import DeleteIcon from '@material-ui/icons/Delete';


const AnnouncementReport = ({title,username,post, userImage,timestamp,id}) => {
    const [posts, setPost] = useState([]);
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState([]);


    const handleComplaints =()=>{

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection("reports").doc("M0x2Pis5urIIewEg3eVA").collection('postsreported').doc(id)
                    .collection("complaints").orderBy("timestamp", "desc").get().then(function (response) {
                    if(!response.empty){
                        setReport(response.docs.map(doc => (doc.data())))
                        console.log(response)
                    }else
                        console.log("report")
                })
            }
        })}
    const handleDelete =()=>{

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection('announcements').doc(id).delete().then(function(){
                    alert("Post deleted.")
                })
            }
        })}

    return (<div>
        <Dialog open={open} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Reported Post</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Reported Post
                </DialogContentText>
                {(open)?(
                    <div>{report.map((report) => (
                        <ReportPost
                            timestamp={report.timestamp}
                            complaint={report.comment}

                        />

                    ))}
                    </div>):(<div/>)}

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => {
                    setOpen(false)
                }}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>

            <div className="post_body">
                <div className="card px-3 py-4 " style={{marginTop: 20}}>
                    <div style={{width: "50%", paddingLeft:"85%" }}>
                        <FindInPageIcon titleAccess={"See complaints"} onClick={() =>{
                            handleComplaints();
                            setOpen(true)}
                        }/>                    </div>
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
                        <div style={{width: "50%", paddingLeft:"85%" }}>
                        <DeleteIcon onClick={handleDelete}  titleAccess={"Delete post"} style={{ color: "red" }}/>
                        </div>
                    </div>


                </div>

            </div>
        </div>


    );
}
export default AnnouncementReport;