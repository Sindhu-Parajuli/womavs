import capture from "./images/Capture.PNG";
import React from "react";
import App from "./App";
import hdr from "./css/hdr.css"


const Dashboard=(logout)=>{

    return(

<div>
    <div className="hdr">
        <nav>
            <h2>Welcome to Womavs</h2>
            <button onClick={logout}>Logout</button>
        </nav>
    </div>
</div>
);
}
export default Dashboard;