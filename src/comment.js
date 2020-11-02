import React, {useEffect, useState} from "react"
import {Comment, CommentContent, CommentGroup} from "semantic-ui-react"
import firebase from "./firebase";



const Comments=()=>{


    const[com,setCom]=useState('');
    const[comm_arr,setComm_arr]=useState([]);
    var comm_array=["Great","Yah"];



    const saveComment=()=> {

        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {

                firebase.firestore().collection('comments').add({
                    comment: com,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    // userimage: usr.photoURL,
                    username: usr.displayName,
                })
            }

        })

    }
    useEffect(() => {
        //grabs posts items from database and places them in our  post array
        firebase.firestore().collection('comments')
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot) =>{setComm_arr(snapshot.docs.map((doc)=>doc.data()))
                console.log(com);
            })

    },[])

    return (<div>
            <div style={{marginTop:20}}>
             <input  type="text"
              placeholder="Add a reply"
                       onChange={(e) => setCom(e.target.value)}
              />
            <button style={{background:"blue"}}>
                    onClick={saveComment}>Comment
            </button>
            </div>

        <div className="card px-3 py-4 " style={{marginTop: 50}}>

            {comm_arr.map(comm=>(
            <CommentGroup>
                <Comment>
                    <CommentContent>
                        <Comment.Author>{comm.username}
                            <Comment.Metadata>{new Date(comm.timestamp?.toDate()).toUTCString()}</Comment.Metadata>
                        </Comment.Author>
                        <Comment.Text>{comm.comment}</Comment.Text>
                    </CommentContent>

                </Comment>

            </CommentGroup>



        ))}

        </div>

        </div>
    );


}

export default Comments;