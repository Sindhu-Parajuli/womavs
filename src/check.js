import capture from "./images/Capture.PNG";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import firebase from "./firebase.js";
import GavelIcon from "@material-ui/icons/Gavel";
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import GavelTwoToneIcon from '@material-ui/icons/GavelTwoTone';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


const Check = (check, pass)=>{
    const height= window.screen.height;
    const width= window.screen.width;
    const history = useHistory();
    const [admins,setAdmins] = useState('')
    const [admin,setStatus] = useState(0)
    const [email,setEmail] = useState('')
    const[open,setOpen]= useState(false)
    const[sopen,setsOpen]= useState(false)
    const[passwords,setPassword]= useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            //alert user of complaint review
           if(usr){
        if (check) {
            console.log(check.check)
            console.log(passwords)
            if (check.check>= 3) {
                firebase.firestore().collection("deleteduser").where("email","==",usr.email).get().then(collection => {
                    //check if post have user already deleted
                    if (collection.docs.length == 0) {

                        firebase.firestore().collection("deleteduser").add({
                            password: "passwords",
                            userimage: usr.photoURL,
                            email: usr.email,
                            username: usr.displayName,
                        })





                    }
                    setsOpen(true)
                })
            }
        }
           }
        })
    },[])

const handleDelete=()=>{
        if(passwords) {
            //set users password in deleted user access
            firebase.auth().onAuthStateChanged(function (usr) {

                //delete users account
                firebase.auth().signInWithEmailAndPassword(usr.email, passwords).then(result => {
                    if (usr) {
                        firebase.firestore().collection("deleteduser").where("email","==",usr.email).get().then(function(respone){
                            if(!respone.empty){
                                respone.forEach(function (doc) {
                                    const docRef = firebase.firestore().collection("deleteduser").doc(doc.id)
                                    docRef.set({password:passwords,userimage: usr.photoURL,
                                        email: usr.email,
                                        username: usr.displayName})
                                    docRef.get().then(function (response) {
                                        usr.delete().then(function () {
                                            // User deleted.
                                            signout()
                                        }).catch(function (error) {
                                            // An error happened.
                                            setPassword("")
                                            console.log(error)
                                        });
                                    })

                                })
                            }
                        })

                    }else{sopen(true)}
                }).catch(function (error) {
                    // An error happened.
                    console.log(error)
                    window.location.href = "/signin"
                });

            })
        }else {window.location.href = "/signin"}
}
    const handlePassword = (e) => {
        if (e.target.value) {
            setPassword(e.target.value)
        }
    };

    const signout = () => {

        firebase.auth().signOut().then(()=>{

            window.location.href = "/signin"
            }

        );
    }
    return(
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your account has been suspended due to complaint(s). Account reviews take time to be evaluated,so wait 1-2 day(s) before signing into your account. If complaints are valid this account will be terminated otherwise please reset password then login.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => {
                        setOpen(false);
                        handleDelete()
                       }}>
                        OK
                    </Button>

                </DialogActions>
            </Dialog>
            <Dialog open={sopen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign in </DialogTitle>
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
                    <Button color="primary" onClick={() => {setsOpen(false);
                    setOpen(true)}}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
export default Check;