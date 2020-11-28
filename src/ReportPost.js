import ReportIcon from "@material-ui/icons/Report";
import {Avatar} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import firebase from "./firebase.js";


const ReportPost = ({complaint, timestamp}) => {


    return (

        <div>
            <div className="post_body"style={{width:window.screen.width*.3}}>
                <div className="card px-3 py-4 " style={{marginTop: 20,marginLeft:20, marginRight:20}}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-12 col-md-8"}>
                                <h5>{new Date(timestamp?.toDate()).toUTCString()}</h5>
                                <p style={{color:"black",marginRight:5}}>{complaint}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>);
}
export default ReportPost;