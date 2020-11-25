import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import Navigation from "./Navbar";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import "./css/Admin.css"

const Admin = () => {
    const height = window.screen.height;
    const width = window.screen.width;
    const history = useHistory();
    const [watchUsers,setWatchUser] = useState([]);
    const [viewReport,setViewReport] = useState(false);
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
                            watchUser:  doc.data()
                        })))})
            } else {
                // No user is signed in.
                signout()
            }
        })
    },[])
const severity =(i)=>{
        if(i === 1){return "rgb(236,233,48)"}
        if(i === 2){return "orange"}
        if(i === 3){return "rgb(221,13,13)"}
}

    return (
        <div className="background_image1">
        <div className="container" >
            <Navigation/>
            <h6>ADMIN</h6>
            <div className="row" >
                <div className="col col-lg-4" style={{paddingBottom: "10%"}}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-header">
                            Watch List
                        </div>
                        <ul className="list-group list-group-flush" >
                            {watchUsers.map(({watchUser, id}) => (
                            <li className="list-group-item" onClick={() => setViewReport(true)}><FingerprintIcon style={{color:severity(watchUser.strikes)}}/>{watchUser.email}</li>
                                ))}

                        </ul>
                    </div>
                </div>
                <div className="col-sm" >
                    {viewReport == true ? (
                    <div className="card" style={{width: "100%"}}>
                        <div className="card-header">
                            Reports
                        </div>
                    </div>):(<div/>)}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Admin;