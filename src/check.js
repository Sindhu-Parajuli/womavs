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
    const[passwords,setPassword]= useState(pass)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                if (check) {
                    console.log(check.check)
                    if (check.check>= 3) {
                        firebase.firestore().collection("deleteduser").add({
                            password: "123456",
                            userimage: usr.photoURL,
                            email: usr.email,
                            username: usr.displayName,
                        }).then(() => {

                           setsOpen(true)
                            //alert("Your account has been suspended due to complaint(s). Account reviews take time to be evaluated,so wait 1 day before signing into your account. If complaints are valid this account will be terminated.")

                        })
                    }
               }
            }
        })


    },[])

const handleDelete=()=>{
        if(passwords) {
            firebase.auth().onAuthStateChanged(function (usr) {
                firebase.auth().signInWithEmailAndPassword(usr.email, passwords).then(result => {
                    if (usr) {
                        usr.delete().then(function () {
                            // User deleted.
                            signout()
                        }).catch(function (error) {
                            // An error happened.
                            setPassword("")
                            console.log(error)
                        });
                    }
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

                history.push("/signin");
            }

        );
    }
    return(
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your account has been suspended due to complaint(s). Account reviews take time to be evaluated,so wait 1 day before signing into your account. If complaints are valid this account will be terminated.
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