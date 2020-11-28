import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import Post from "./Post"
import Navigation from "./Navbar"
import {firestore} from "firebase";
import * as admin from "firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import Check from "./check";


const Homepage = (logout) => {
    const height = window.screen.height;
    const width = window.screen.width;
    const history = useHistory();
    const [posts, setPost] = useState([]);
    const [posttext, setPostText] = useState('')
    const [mydata, setMydata] = useState([]);
    const [myname, setmyName] = useState([]);
    const [user, setUser] = useState('');
    const [check, setCheck] = useState();
    const [open, setOpen] = useState(false);


    const signout = () => {
        firebase.auth().signOut().then(() => {

                history.push("/Signin");
            }
        );
    }

    //loads when homepage is loads
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                // User is signed in.
                setUser(usr)
                const docRef = firebase.firestore().collection("watchList").where("email", "==", usr.email)
                docRef.get().then(function (response) {
                    if (!response.empty) {
                        setCheck(response.docs.map((doc) =>
                                    doc.data()))
                    }
                            });



                        //grabs posts items from database and places them in our  post array
                        firebase.firestore().collection('posts')
                            .orderBy("timestamp", "desc")
                            .onSnapshot((snapshot) => {
                                setPost(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    post: doc.data()
                                })));
                                console.log(posts)
                            })
            } else {
                // No user is signed in.
                signout()
            }

        })
    },[])

    console.log(check)
    const savePost = function (user) {



        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection('posts').add({
                    post: posttext,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    userimage: usr.photoURL,
                    username: usr.displayName,
                    email: usr.email,
                })
                setPostText("");
            } else {
                // No user is signed in.
                signout()
            }
        })
        alert("Post successful")
    }


    return (
        <div>
            {(check)?(
                <Check
                    check={check[0].strikes}
                    pass={""}
                />
            ):(<div/>)}


            {user ? (
                <div style={{background: "rgb(255,250,250)"}}>
                    <Navigation/>
                    <div className="card px-3 py-4">
                        <div className="container px-3">
                            <label className="mb-1">
                                <h6 className="">Write Something....</h6>
                            </label>
                            <textarea className="mb-4" type="text"
                                      placeholder="Write a post"
                                      onChange={(e) => setPostText(e.target.value)}
                            />
                            <button className="btn float-left"
                                    style={{background: "rgb(0,100,177)", alignSelf: "right"}}
                                    onClick={savePost}>Post
                            </button>

                        </div>
                    </div>

                    <div className="card px-3 py-4 " style={{marginTop: 20}}>
                        {posts.map(({post, id}) => (
                            <Post
                                key={id}
                                pst_id={id}
                                username={post.username}
                                timestamp={post.timestamp}
                                userImage={post.userimage}
                                post={post.post}
                                email={post.email}
                            />
                        ))}

                    </div>


                </div>

            ) : (<div/>)}

        </div>

    )


}
export default Homepage;
