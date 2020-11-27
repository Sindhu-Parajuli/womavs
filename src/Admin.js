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

    }
    const handleHomeReportSetup = (email) => {

        console.log(email)
        setEmail(email)
        firebase.auth().onAuthStateChanged(function (usr) {
            //get reports from home page
            const docRefc = firebase.firestore().collection('reports').doc("3AfrheZxjj44kpnESOsG")
                .collection("postsreported")
                .where("email", "==", email)
            docRefc.get().then(function (response) {
                if (response.empty) {
                    console.log("HMM")
                } else {
                    console.log(response)
                    setViewHomePageReport(response.docs.map(doc => ({
                        type: 1,
                        hReport: doc.data()

                    })))
                }
            })

        })
    }
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
                                <div className="card" style={{width: "50%", marginBottom: 10, marginTop: 10}}>
                                    <h3> {email}</h3>
                                </div>
                                <div className="card" style={{width: "96%",marginBottom:10}}>
                                    <div className="card-header">
                                        Reported Messages
                                    </div>
                                    <div className="card" style={{width: "100%",marginBottom:10}}>
                                        <h6 style={{paddingTop: 10, paddingLeft: 5}} className="card-subtitle mb-2 ">
                                            Homepage Feed
                                        </h6>

                                        {viewHomePageReport.map(({type, hReport}) => (
                                            <Report
                                                messagetype={type}
                                                is_comment={hReport.is_comment}
                                                id={hReport.id}
                                                email={hReport.email}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                <div className="card" style={{width: "96%"}}>
                                    <div className="card" style={{width: "100%"}}>
                                        <h6 style={{paddingTop: 10, paddingLeft: 5}} className="card-subtitle mb-2 ">
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