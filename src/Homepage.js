import firebase from "./firebase.js";
import React,{useState, useEffect} from "react";
import App from "./App";
import hp from "./css/hp.css"
import {useHistory} from "react-router-dom";
import logo from "./images/Capture.PNG"
import {Navbar,Nav} from "react-bootstrap";
import capture from "./images/Capture.PNG";




const Homepage=(logout)=> {
    const history = useHistory();
    const [post, setpost] = useState('');
    const [mydata,setMydata]=useState([]);
    const[myname,setmyName]=useState([]);

    const signout = () => {
        firebase.auth().signOut().then(history.push("/Signin"));
    }


    const[posts,setPosts]=useState([]);
    //display posts
    var ref = firebase.database().ref().child("Posts").orderByChild('posts');
    var keys = [];
    var counts = [];
    ref.once('value', function (snap) {
        snap.forEach(function (item) {
            var itemVal = item.val();
            keys.push(itemVal);
        });
        for (var i = 0; i < keys.length; i++) {
            counts.push(keys[i].posts);
        }
        setMydata(counts);
    })
    //display user name
    var uid=firebase.auth().currentUser.uid;
    var userr=firebase.auth().currentUser;
    var post_name=userr.displayName;

//load username
    const[usname,setUsname]=useState([]);
    var refk = firebase.database().ref().child("Posts").orderByChild('name');
    var keys1 = [];
    var counts1 = [];

    refk.once('value', function (snap) {
        snap.forEach(function (item) {
            var itemVal1 = item.val();
            keys1.push(itemVal1);
        });
        for (var i = 0; i < keys.length; i++) {
            counts1.push(keys[i].name);
        }
        setUsname(counts1);
    })



    var date = Math.floor(Date.now() / 1000)

    var ref2 = firebase.app().database().ref();
    var usersRef = ref2.child('Posts').child(uid + date);

    //save posts
    var savePost = function (user) {
        usersRef.set({
            posts: post,
            time: date,
            uid:uid,
        })
        alert("Post successful")

    }


    return (
        <div style={{background: "rgb(255,250,250)"}}>
            <nav className="navbar navbar bg-blue" style={{background: "rgb(0,100,177)"}}>
                <a className="navbar-brand" href="#">
                    <img src={capture} width="60" height="60"/>
                </a>

                <div className="topnav" id="myTopnav" style={{width: 800, margin: '0 auto'}}>
                    <a href="#home">Home</a>
                    <a href="#chatrooms">Chatrooms</a>
                    <a href="#ann">Announcement</a>
                    <a href="#resources">Resources</a>
                    <a href="#myacc">My account</a>
                    <a href="#Logout">Logout</a>
                    <a href="#abu">About Us</a>


                </div>
            </nav>

            <div className="card px-3 py-4">
                <div className="container px-3">
                    <label className="mb-1">
                        <h6 className="">Write Something....</h6>
                    </label>
                    <textarea className="mb-4" type="text"
                              placeholder="Write a post"
                              onChange={(e) => setpost(e.target.value)}
                    />
                    <button Class="btn float-left" style={{background: "rgb(0,100,177)", alignSelf: "right"}}
                            onClick={savePost}>Post
                    </button>

                </div>
            </div>

            <div className="card px-3 py-4 " style={{marginTop: 20}}>

                <div className="post_body">
                    {mydata.map((number) =>

                        <div className="card px-3 py-4 " style={{marginTop: 20}}>
                            <h1> {number}</h1>
                            <li>{number}</li>
                            <ul className="list-group">
                                <button className="btn float-Center" style={{
                                    display: 'flex',
                                    background: "rgb(0,100,177)",
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    height: 40,
                                    width: 200
                                }}
                                        onClick={savePost}>Comment
                                </button>

                            </ul>
                        </div>

                    )}

                </div>

            </div>


        </div>
    )

    return 0;


}
export default Homepage;






