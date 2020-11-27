import ReportIcon from "@material-ui/icons/Report";
import {Avatar, Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import firebase from "./firebase.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AnnouncementReport from "./AnnouncementReport";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {Comment, CommentContent, CommentGroup} from "semantic-ui-react";
import ReportPost from "./ReportPost";


const HomeReport = ({post_id, comment_id, is_comment,email}) => {
    const [post, setPost] = useState([]);
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState([]);


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                if (is_comment === 1) {
                    const docRefc = firebase.firestore().collection("posts").doc(post_id).collection("comments").doc(comment_id)
                    docRefc.get().then(function (response) {
                        if (response.exists) {
                            setPost(response.data())
                        }


                    })
                }else {
                    const docRefc = firebase.firestore().collection("posts").doc(post_id)
                    docRefc.get().then(function (response) {
                        if (response.exists) {
                            setPost(response.data())
                        }


                    })

                }

            } else {
                // No user is signed in.
                window.location.href = "/signin"
            }
        })
    }, [])

    const handleComplaints =()=>{

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
 if(is_comment===1)
 {
     firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').doc(comment_id)
         .collection("complaints").get().then(function (response) {
         if(!response.empty){
             setReport(response.docs.map(doc => (doc.data())))
             // console.log(response)
         }else
             console.log("report")
     })
 }else{





     firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').doc(post_id)
         .collection("complaints").get().then(function (response) {
         if(!response.empty){
             setReport(response.docs.map(doc => (doc.data())))
              console.log(response)
         }else
             console.log("report")
     })
 }

            } else {
                // No user is signed in.
                window.location.href = "/signin"
            }
        })
    }
    console.log(post)
    console.log(report)
    return (

       <div>
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
                        <div style={{width: "50%", paddingLeft: "85%"}}>
                            <div className={"col-6 col-md-4 text-right"} style={{alignContent: "right"}}>
                                <FindInPageIcon titleAccess={"See complaints"} onClick={() =>{
                                    handleComplaints();
                                    setOpen(true)}
                                }/>
                            </div>
                        </div>
                        {(is_comment === 0) ? (
                            <div>

                                <div>
                                    <div className={"row"} style={{marginLeft: 5}}>
                                        <Avatar src={post.userImage}></Avatar>
                                        <p>{new Date(post.timestamp?.toDate()).toUTCString()}</p>
                                    </div>
                                    <div id={"post_header"}>
                                        <h1>{post.username}</h1>
                                        <p>{post.post}</p>
                                    </div>
                                </div>

                            </div>) : (<div>

                            <div>
                                <Comment style={{background: "rga(220,220,220)"}}>
                                    <div style={{width: "50%", paddingLeft: "85%"}}>
                                    </div>
                                    <CommentContent>
                                        <Comment.Author>{post.username}
                                            <Comment.Metadata>{new Date(post.timestamp?.toDate()).toUTCString()}</Comment.Metadata>
                                        </Comment.Author>
                                        <Comment.Text>{post.message}</Comment.Text>
                                    </CommentContent>
                                    <hr
                                        style={{width: 800}}
                                    />
                                </Comment>
                            </div>
                        </div>)}

                    </div>
                </div>


        </div>);

}
export default HomeReport;