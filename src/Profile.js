import capture from "./images/Capture.PNG";
import React,{useState, useEffect} from "react";
import App from "./App";
import hdr from "./css/hdr.css"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";
import backgroundImage from "./images/pexels-suzy-hazelwood-1560093.jpg"
import propic from "./images/default.PNG"
import {Button, Checkbox, FormControlLabel, FormGroup,Modal} from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const Profile=(logout)=>{

    const[user,setUser]=useState(null);
    const[password,setPassword]=useState(null);
    const [name, setNewUsername] = useState('');
    const[photo,setNewProfilePic] = useState({
        name:  null,
    });
    const[deleteAc,setStatus] =useState(false)
    const [url,setUrl] = useState()
    console.log(user)
    const history = useHistory();

    //https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    //get browser dimensions
    const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    const height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    const [view,setView]=useState(0)

    useEffect(() =>{
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                // User is signed in.
                setUser(usr);
                setNewUsername(usr.displayName)
                console.log(name)

            } else {
                // No user is signed in.
                signout()
            }
        });
    },[]);
    const signout = () => {
        firebase.auth().signOut().then(history.push("/Signin"));
    }
    const cancelEdit =()=>{
        setView(0)
        document.getElementById("propic").src = user.photoURL
        setNewProfilePic(null);
    }
    const resetPass=()=>{
        setView(0)
        firebase.auth().sendPasswordResetEmail(user.email).then(function() {
            // Email sent.
            alert("Password reset link was sent to your email!")
        }).catch(function(error) {
         console.log(error)
        });


    }
    const saveProfileEdit=()=>{
        setView(0)
        console.log("NAME: "+name)
        user.updateProfile({
            displayName: name.trim(),
            photoURL: url
        }).then(function() {
            // Update successful.
        }).catch(function(error) {
            // An error happened.
            console.log(error)
        });
        document.getElementById("currUsername").innerText = name;


    }
    const deleteAccount=()=>{
        setView(0)
        firebase.auth().signInWithEmailAndPassword(user.email, password).then(result =>{
        user.delete().then(function() {
            // User deleted.
            signout()
        }).catch(function(error) {
            // An error happened.
            console.log(error)});

    });
    }

    const handleUploadImage=()=>{
        console.log(photo)
        if(photo.name) {
            var storageRef = firebase.storage().ref();
            //`user.displayName+/profilePicture/'${photo.name}`
            //create a reference to users pic in storage
            var ImagesRef = storageRef.child(`${user.email}/profilePicture/${photo.name}`);

            console.log(ImagesRef)
            //upload pic to firebase
            var task = ImagesRef.put(photo).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(downloadURL)
                    document.getElementById("propic").src = downloadURL
                    setUrl(downloadURL);

                })

            });

        }
    }
const handleImage=(e)=>{
    if(e.target.files[0]){
        setNewProfilePic(e.target.files[0])
    }
};
    const handleName=(e)=>{
        if(e.target.value){
            setNewUsername(e.target.value)
        }
    };
    const handlePassword=(e)=>{
        if(e.target.value){
            setPassword(e.target.value)
        }
    };
    return(
        <div>
        {deleteAc ==true?(<div>
            <Dialog open={true}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                      Enter your password then click sumbit.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handlePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  color="primary" onClick={()=>setStatus(false)&&setPassword("")}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={()=>deleteAccount()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            </div>):(

        <div>
        {user?(
            <div >
                {/* Header*/}
                <nav className="navbar navbar-default" style={{background: "rgb(0,100,177)"}}>
                    <div className="container-fluid">
                        <div>
                            <h2 style={{color: "white"}}>WoMavs</h2>
                            <img id={"lo"} src={capture} style={{marginLeft: width - (width / 2), marginTop: 5}}
                                 height={75} width={100} alt="..."/>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="/homepage" style={{color: "white"}}>Home</a></li>
                            <li><a href="/chatrooms" style={{color: "white"}}>Chatrooms</a></li>
                            <li><a href="/resources" style={{color: "white"}}>Resources</a></li>
                            <li><a onClick={signout} style={{color: "white"}}>Logout</a></li>

                        </ul>
                    </div>
                </nav>

                {/* Body*/}
                <div className={"row"} >
                <div className="card" style={{width: width / 4, height:"100%"}}>
                    <div className="col-lg-11" style={{marginBottom:0,marginLeft:10}}>
                        {user.photoURL?(
                            <img src={user.photoURL} style={{marginTop:10,marginBottom:0}}  id={"propic"} className="card-img" alt="..."/>
                        ):(
                            <img src={propic} style={{marginTop:10,marginBottom:0}} id={"propic"} className="card-img" alt="..."/>
                        )}
                    </div>
                    <div className="col-lg-12">

                            {user.displayName?(
                            <h5 className="card-title" id={"currUsername"} style={{marginLeft:"30%"}}>{user.displayName}</h5>
                                ):(
                                <h5 className="card-title" style={{marginLeft:"30%"}}>Somewhere</h5>
                            )}
                            <div className={"card-body"}>
                            <ul className={"list-unstyled" }>
                                <li><Button variant="contained" color={"default"} style={{marginBottom:5}} onClick={() =>setView(1)}>Edit Profile</Button>{' '}</li>
                                <li><Button variant="contained" color={"primary"} style={{marginBottom:5}} onClick={() =>resetPass()}>Reset Passsword</Button>{' '}</li>
                                <li> <Button variant="contained" color={"secondary"} onClick={()=>setStatus(true)}>Delete Account</Button>{' '}</li>
                            </ul>
                            </div>
                    </div>
                    </div>
                    <div className={"row"}>
                    {view == 1?(
                    /*Edit Profile View*/

                        <div className={"col"}>
                        <div className={"col-lg-10"} style={{marginTop:30}}>
                        <label>Profile Picture
                        <input
                            accept="image/*"
                            style={{marginTop:10}}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImage}
                        />
                        <label style={{marginLeft:10}}>
                            <Button variant="contained" color="primary" component="span"  onClick={handleUploadImage}>
                                Upload
                            </Button>
                        </label>
                        </label>
                    </div>
                        <div className={"col-lg-10"}>

                            <label>Username</label>
                            <input
                                name={"name"}
                                type="text"
                                onChange={handleName}
                                defaultValue={name}
                                placeholder={"Enter New Username"}/>
                        </div>
                            <label style={{marginLeft:10, marginTop:"40%",marginRight:50}}>
                                <Button variant="contained" color="default" onClick={() =>cancelEdit()} component="span">
                                    Cancel
                                </Button>
                            </label>
                    <label style={{marginLeft:10, marginTop:"40%",marginRight:50}}>
                        <Button variant="contained" color="primary" onClick={() =>saveProfileEdit()}component="span">
                            Save
                        </Button>
                    </label>
                        </div>
                        ):(
                            <div className={"col-lg-10"} style={{position:"fixed"}}>
                                <img src={backgroundImage} style={{width:width*.77,height: 300} } alt={"..."}/>
                            </div>)}
                    </div>
            </div>
            </div>

            ):(<div/>)}
        </div>)}
        </div>
    );

}
export default Profile;