import React, {useEffect, useState} from "react";
import firebase from "./firebase.js";
import {Avatar, Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Comment, CommentContent, CommentGroup} from "semantic-ui-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ReportIcon from '@material-ui/icons/Report';

const Post = ({pst_id, username, timestamp, userImage, post, email}) => {
    const [hidecom, setHidecom] = useState(false)
    const history = useHistory();
    const [cmnts, setCmnts] = useState([]);
    const [row, setRow] = useState("");
    const [open, setOpen] = useState(false);
    const [rcomment, setReportComment] = useState("")
    const [commentID, setCommentID] = useState("")
    const [reportUser, setReportUser] = useState({
        username: "",
        email: "",
        posORcom:0,
        id:""
    })
    const [docId, setdocID] = useState("")

console.log(username)
    const changeHide = () => {
        setHidecom(true);
    }

    const changeHideFalse = () => {
        setHidecom(false);
    }

    const handleReport = () => {

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

//if post has never been reported on add it to collection
               const docRefc = firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').doc(reportUser.id)
                docRefc.set({email:reportUser.email,id:pst_id,is_comment:reportUser.posORcom})
                docRefc.get().then(function (response) {
                })


                firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').doc(reportUser.id)
                    .collection("complaints").add({
                    comment: rcomment,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    email: reportUser.email,
                    postId: pst_id,
                    commentId: commentID
                })


                const docRef = firebase.firestore().collection("watchList").where("email", "==", email)

                docRef.get().then(function (response) {

                    if (!response.empty) {

                        response.docs.forEach((doc) => {
                                firebase.firestore().collection("watchList").doc(doc.id).update({
                                    strikes: firebase.firestore.FieldValue.increment(1)
                                });
                            }
                        )
                    } else {
                        firebase.firestore().collection("watchList").add({
                            email: email,
                            strikes: 1
                        })
                    }


                })
            }

        })
    }
    useEffect(() => {
        let sbc;

        if (pst_id) {
            sbc = firebase.firestore().collection("posts").doc(pst_id).collection("comments").orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setCmnts(snapshot.docs.map(doc => ({
                        id: doc.id,
                        cmnt: doc.data()
                    })))

                });
        }
        return () => {
            sbc();
        };

    }, [pst_id]);


    const saveComm = (evnt) => {

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection("posts").doc(pst_id).collection('comments').add({
                    message: row,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    email: usr.email,
                    username: usr.displayName,
                })

                setRow('');
            }

        })
    }
    const handleReportComment = (e) => {
        if (e.target.value) {
            setReportComment(e.target.value)
        }
    };
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report User {reportUser.username} </DialogTitle>
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
                    <div style={{width: "50%", paddingLeft: "85%"}}>
                        <ReportIcon titleAccess={"Report User"} fontSize={"large"} style={{color: "rgb(239,145,44)"}}
                                    onClick={() => {
                                        setOpen(true);
                                        setReportUser({username: username, email: email,posORcom:0,id: pst_id})
                                    }}></ReportIcon>
                    </div>
                    <div className={"row"} style={{marginLeft: 5}}>
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
                            marginTop: 10,
                            alignSelf: 'center',
                            height: 40,
                            width: 200
                        }}
                                            onClick={changeHide}><b>Comment</b>
                        </button> : null}
                    </ul>

                    {hidecom ? <form style={{marginTop: 20}}>
                        <hr
                            style={{width: 1100}}
                        />
                        <input type="text" required value={row} style={{blockSize: 25}}
                               onChange={(e) => setRow(e.target.value)}
                               placeholder="Add a comment"/>
                        <button type="submit" style={{background: "rgb(0,100,177)"}} onClick={saveComm}>Comment</button>
                        <button type="submit" style={{background: "red"}} onClick={changeHideFalse}>Cancel</button>
                    </form> : null}


                    {hidecom ? <div style={{background: "rgb(220,220,220)", marginTop: 20, width: "100%"}}>
                        {
                            cmnts.map(({cmnt, id}) => (
                                <CommentGroup style={{width: "100%"}}>
                                    <Comment style={{background: "rga(220,220,220)"}}>
                                        <div style={{width: "50%", paddingLeft: "85%"}}>
                                            <ReportIcon titleAccess={"Report User"} fontSize={"medium"}
                                                        style={{color: "rgb(239,145,44)"}} onClick={() => {
                                                setOpen(true);
                                                setCommentID(id)
                                                setReportUser({username: cmnt.username, email: cmnt.email,posORcom:1,id:id})
                                            }}></ReportIcon>
                                        </div>
                                        <CommentContent>
                                            <Comment.Author>{cmnt.username}
                                                <Comment.Metadata>{new Date(cmnt.timestamp?.toDate()).toUTCString()}</Comment.Metadata>
                                            </Comment.Author>
                                            <Comment.Text>{cmnt.message}</Comment.Text>
                                        </CommentContent>
                                        <hr
                                            style={{width: 800}}
                                        />
                                    </Comment>
                                </CommentGroup>
                            ))}

                    </div> : null
                    }


                </div>


            </div>
        </div>
    );
}
export default Post;