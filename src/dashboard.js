import capture from "./images/Capture.PNG";
import React from "react";
import App from "./App";
import hdr from "./css/hdr.css"
import {useHistory} from "react-router-dom";


const Dashboard = () => {

    const history = useHistory();

    const redirectToHomePage = () => {
        history.push("/")
    }

    return (

        <div>
            <div className="hdr">
                <nav>
                    <h2>Welcome to Womavs</h2>
                    <button onClick={redirectToHomePage}>Logout</button>
                </nav>
            </div>
        </div>
    );
}
export default Dashboard;