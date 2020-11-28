import capture from "./images/Capture.PNG";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import AnnouncementPost from "./Announcementpost";
import Navigation from "./Navbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";


const Announcement = (logout) => {
    const height = window.screen.height;
    const width = window.screen.width;
    const history = useHistory();
    const [posts, setPost] = useState([]);
    const [posttitle, setPostTitle] = useState('')
    const [posttext, setPostText] = useState('')
    const [mydata, setMydata] = useState([]);
    const [myname, setmyName] = useState([]);
    const [user, setUser] = useState('');


    const signout = () => {
        firebase.auth().signOut().then(() => {
                //this.store.dispatch('clearData')
                history.push("/Signin");
            }
        );
    }
    //loads when homepage is loads
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                // User is signed in.
                setUser(usr);
                //const image = firebase.storage().ref(`images/${user.uid}`);
            } else {
                // No user is signed in.
                signout()
            }
        })

        let date = new Date();
        console.log(date)
        date.setDate(date.getDate() - 7)
        console.log(date);
        //grabs posts items from database and places them in our  post array
        firebase.firestore().collection('announcements')
            .orderBy("timestamp", "desc")
            .where("timestamp", ">=", firebase.firestore.Timestamp.fromDate(date))
            .onSnapshot((snapshot) => {
                setPost(snapshot.docs.map(doc => ({

                    id: doc.id,
                    post:  doc.data()
                })))
                console.log(posts)
            })
    }, [])


    const savePost = function (user) {
        console.log(user.photoURL)

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection('announcements').add({
                    post: posttext,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    userimage: usr.photoURL,
                    username: usr.displayName,
                    title: posttitle,
                    email: usr.email
                })
            } else {
                // No user is signed in.
                signout()
            }
        })
    }


    console.log(posts)


    return (
        <div>
            {user ? (
                <div style={{background: "rgb(255,250,250)"}}>
                 <Navigation/>
                    <div className="card px-3 py-4">
                        <div className="container px-3">
                            <label className="mb-1">
                                <label>Title
                                    <input onChange={(e) => setPostTitle(e.target.value)}/>
                                </label>

                                <h6 className="">Write Something....</h6>
                            </label>
                            <textarea className="mb-4" type="text"
                                      placeholder="Write a announcement"
                                      onChange={(e) => setPostText(e.target.value)}
                            />
                            <button className="btn float-left"
                                    style={{background: "rgb(245,128,38)", color: "white", alignSelf: "right"}}
                                    onClick={savePost}>Post
                            </button>

                        </div>
                    </div>

                    <div className="card px-3 py-4 " style={{marginTop: 20}}>
                        {posts.map(({post,id})=>(
                            <AnnouncementPost
                                username={post.username}
                                timestamp={post.timestamp}
                                userImage={post.userimage}
                                post={post.post}
                                title={post.title}
                                email ={post.email}
                                id={id}
                            />
                        ))}

                    </div>


                </div>

            ) : (<div/>)}

        </div>

    )


}
export default Announcement;
