import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import Post from "./Post"
import Navigation from "./Navbar"
import {firestore} from "firebase";
import * as admin from "firebase";


const Homepage = (logout) => {
    const height = window.screen.height;
    const width = window.screen.width;
    const history = useHistory();
    const [posts, setPost] = useState([]);
    const [posttext, setPostText] = useState('')
    const [mydata, setMydata] = useState([]);
    const [myname, setmyName] = useState([]);
    const [user, setUser] = useState('');
    const [check, setCheck] = useState('');


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

                // check if account is disabled
                const docRef = firebase.firestore().collection("watchList").where("email", "==", 'troll@mavs.uta.edu')
                docRef.get().then(function (response) {
                    if (!response.empty) {
                        response.docs.forEach((doc) => {
                            firebase.firestore().collection("watchList").where("email", "==", 'troll@mavs.uta.edu').onSnapshot((snapshot) => {
                                setCheck(snapshot.docs.map((doc) =>
                                    doc.data()))
                            });
                        })
                    }
                })
            } else {
                // No user is signed in.
                signout()
            }

        })

        //grabs posts items from database and places them in our  post array
        firebase.firestore().collection('posts')
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                setPost(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })));
                console.log(posts)
            })
    }, [])


    useEffect(() => {

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                console.log("check")
                if (check) {
                    console.log(check[0].strikes)
                    if (check[0].strikes >= 3) {
                        usr.updatePassword("1DSAaC0nT")
                    }
                }
            }
        })
    })


    const savePost = function (user) {
        console.log(user.photoURL)


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
