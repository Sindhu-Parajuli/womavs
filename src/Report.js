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
import AnnouncementReport from "./AnnouncementReport";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeReport from "./HomeReport";

const Report = ({messagetype, id, is_comment, email}) => {

    const [report, setReport] = useState([]);
    const [areport, setAReport] = useState([]);
    console.log(report)
    console.log(report[0])
//get ori post
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                //home feed
                if (messagetype === 1) {
                    console.log("report")
                    var Refc = firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').where("email", "==", email)
                    Refc.get().then(function (response) {

                        if (!response.empty) {
                            firebase.firestore().collection("reports").doc("3AfrheZxjj44kpnESOsG").collection('postsreported').doc(response.docs[0].id)
                                .collection("complaints")
                                .onSnapshot((snapshot) => {
                                    setReport(snapshot.docs.map(doc => (doc.data())))
                                })
                            // console.log(response)
                        } else
                            console.log("report")
                    })


//announcement feed
                }
                if (messagetype === 2) {
                    firebase.firestore().collection('announcements').doc(id).get().then(function (response) {
                        if (response.exists) {
                            setAReport(response.data())
                        }
                    })


                } else {
                }


            } else {
                // No user is signed in.
                window.location.href = "/signin"
            }
        })
    }, [])


    return (<div>

        {/*homepage report*/}
        {messagetype == 1 ? (<div>
                {(report[0]) ? (
                    <HomeReport
                        comment_id={report[0].commentId}
                        post_id={report[0].postId}
                        is_comment={is_comment}

                    />
                ) : (
                    <div/>
                )}


            </div>
        ) : (
            <div>
                {/*announcement report*/}

                {(messagetype == 2) ? (
                    <div>
                        <AnnouncementReport
title={areport.title}
post={areport.post}
timestamp={areport.timestamp}
userImage={areport.userimage}
username={areport.username}
id={id}
                        />
                    </div>


                ) : (
                    <div>
                        {/*chatroom report*/}
                    </div>
                )}
            </div>
        )}
    </div>);
}
export default Report;