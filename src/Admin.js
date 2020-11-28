import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import Navigation from "./Navbar";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import "./css/Admin.css"
import Report from "./Report";

const Admin = () => {
    const height = window.screen.height;
    const width = window.screen.width;
    const history = useHistory();
    const [watchUsers, setWatchUser] = useState([]);
    const [viewReport, setViewReport] = useState(false);
    const [viewHomePageReport, setViewHomePageReport] = useState([]);
    const [viewAnnouncementPageReport, setViewAnnouncementPageReport] = useState([]);
    const [email, setEmail] = useState("");
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);


    const signout = () => {
        firebase.auth().signOut().then(() => {
                history.push("/Signin");
            }
        );
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                firebase.firestore().collection('watchList')
                    .onSnapshot((snapshot) => {
                        setWatchUser(snapshot.docs.map(doc => ({

                            id: doc.id,
                            watchUser: doc.data()
                        })))
                    })
            } else {
                // No user is signed in.
                signout()
            }
        })
    }, [])
    const severity = (i) => {
        if (i === 1) {
            return "rgb(236,233,48)"
        }
        if (i === 2) {
            return "orange"
        }
        if (i >= 3) {
            return "rgb(221,13,13)"
        }
    }
    const handleStrikeRemoval = () => {
        const docRef = firebase.firestore().collection("watchList").where("email", "==", email)

        docRef.get().then(function (response) {

            if (!response.empty) {

                response.docs.forEach((doc) => {
                        firebase.firestore().collection("watchList").doc(doc.id).delete()
                    }
                )
            }
        })
//reinstate deleted members
        const docRefd = firebase.firestore().collection("deleteduser").where("email", "==", email)
        docRef.get().then(function (response){
            response.docs.forEach(function (doc) {
                const dusr =doc.data();
                firebase.auth().createUserWithEmailAndPassword(dusr.email, dusr.pass).then(function ()
                {   //add user's username and default profile pic to database
                    firebase.auth().onAuthStateChanged((usr) => {
                        usr.updateProfile({
                            displayName: email.substring(0,email.indexOf("@")),
                            photoURL: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                        }).catch(err=>{
                            console.log(err);
                        })

                    })})
        })})
    }
    const handleHomeReportSetup = (email) => {

        console.log(email)
        setEmail(email)
        firebase.auth().onAuthStateChanged(function (usr) {
            //get watchList memebers rnpm start
            // reports on posts from home page
//POSTS
            const docRefc = firebase.firestore().collection('reports').doc("3AfrheZxjj44kpnESOsG")
                .collection("postsreported")
            docRefc.where("email", "==", email).get()
                .then(function (response) {
                    if (!response.empty) {
                        response.forEach(function (doc) {

                            firebase.firestore().collection('reports').doc("3AfrheZxjj44kpnESOsG")
                                .collection("postsreported").doc(doc.id)
                                .collection("complaints").get()
                                .then(collection => {
                                    //check if post have complaints
                                    if (collection.docs.length > 0) {
                                        //collect each watchList users reported post
                                        //setPosts(posts => posts.concat( response.docs.map(doc => doc.data())))
                                        setViewHomePageReport(hReport => hReport.concat(response.docs.map(doc => doc.data())))

                                    }
                                })
                        })

                    }
                })


//COMMENTS
            firebase.firestore().collection('reports').doc("3AfrheZxjj44kpnESOsG")
                .collection("postsreported").get().then(function (response) {
                if (response.empty) {

                } else {
                    console.log(response)
                    response.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        //collect each watchList users reported comments
                        firebase.firestore().collection('reports').doc("3AfrheZxjj44kpnESOsG")
                            .collection("postsreported").doc(doc.id).collection("comments")
                            .where("email", "==", email).get().then(function (response) {
                            if (!response.empty) {
                                //setComments(comments => comments.concat( response.docs.map(doc => doc.data())))
                                setViewHomePageReport(hReport => hReport.concat(response.docs.map(doc => doc.data())))
                            } else {
                                console.log("wrong")
                            }

                        })


                        //setViewHomePageReport(hReport=>[...hReport,snapshot.docs.map(doc=>doc.data())]))
                    });

                    //setViewHomePageReport(hReport=>[...hReport,comment])
                    //setViewHomePageReport({hReport:comments})
                }
            })
        })
    }

    console.log("posts")
    console.log(posts)
    console.log("comments")
    console.log(comments)
    console.log("viewHomePageReport")
    console.log(viewHomePageReport)

    const handleAnnouncementReportSetup = (email) => {

        console.log(email)
        setEmail(email)
        firebase.auth().onAuthStateChanged(function (usr) {
            //get reports from home page
            const docRefc = firebase.firestore().collection('reports').doc("M0x2Pis5urIIewEg3eVA")
                .collection("postsreported")
                .where("email", "==", email)
            docRefc.get().then(function (response) {
                if (response.empty) {
                } else {
                    console.log(response)
                    setViewAnnouncementPageReport(response.docs.map(doc => ({
                        type: 2,
                        aReport: doc.data()

                    })))
                }
            })

        })
    }
    console.log("viewAnnouncementPageReport")
    console.log(viewAnnouncementPageReport)

    return (
        <div className="background_image1">
            <div className="container">
                <Navigation/>
                <h6>ADMIN</h6>
                <div className="row">

                    <div className="col-sm" style={{color: "black"}}>
                        {viewReport == false ? (
                            <div className="col col-lg-4" style={{paddingBottom: "10%"}}>
                                <div className="card" style={{width: "20rem", color: "black"}}>
                                    <div className="card-header">
                                        Watch List
                                    </div>
                                    <ul className="list-group list-group-flush" style={{color: "black"}}>
                                        {watchUsers.map(({watchUser, id}) => (
                                            <a href={"#"}>
                                                <li className="list-group-item" onClick={() => {
                                                    setViewReport(true);
                                                    handleHomeReportSetup(watchUser.email)
                                                    handleAnnouncementReportSetup(watchUser.email)
                                                }}><FingerprintIcon
                                                    style={{color: severity(watchUser.strikes)}}/>{watchUser.email}
                                                </li>
                                            </a>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <a href={"admin"}>
                                    <button>Back</button>
                                </a>
                                <button onClick={handleStrikeRemoval}>Dimiss Strikes</button>
                                <div className="card" style={{width: "96%", marginBottom: 10, marginTop: 10}}>
                                    <h3 style={{width: "95%"}}> {email}</h3>
                                </div>
                                <div className="card" style={{width: "96%", marginBottom: 10}}>
                                    <div className="card-header">
                                        Reported Messages
                                    </div>
                                    <div className="card" style={{width: "100%", marginBottom: 10}}>
                                        <h6 style={{paddingTop: 10, paddingLeft: 5}} className="card-subtitle mb-2 ">
                                            Homepage Feed
                                        </h6>

                                       {viewHomePageReport.map((hReport) => (
                                            <Report
                                                messagetype={1}
                                                is_comment={hReport.is_comment}
                                                id={hReport.post_id}
                                                email={hReport.email}
                                                c_id={hReport.comment_id}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="card" style={{width: "96%"}}>
                                        <div className="card" style={{width: "100%"}}>
                                            <h6 style={{paddingTop: 10, paddingLeft: 5}}
                                                className="card-subtitle mb-2 ">
                                                Announcement Feed
                                            </h6>

                                            {viewAnnouncementPageReport.map(({type, aReport}) => (
                                                <Report
                                                    messagetype={type}
                                                    is_comment={aReport.is_comment}
                                                    id={aReport.id}
                                                    email={aReport.email}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row" style={{height: height}}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;