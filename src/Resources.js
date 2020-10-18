import capture from "./images/Capture.PNG";
import uta from "./images/uta.png"
import React, {useState} from "react";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css"
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import {Carousel} from "react-bootstrap";

const Resources=({deviceType}) => {
    return (
        <div>
            <nav style={{background: "rgb(0,100,177)"}}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left"
                                 alt="..."/></a>
                        <br></br><h2 style={{textAlign: "center", color: "white"}}>Resource Page</h2>
                    </div>
                    <ul className="nav navbar-nav" style={{textAlign: "right"}}>
                        <li className="active"><a href="/resources" style={{color: "white"}}>RESOURCES</a></li>
                        <li><a href="/chatrooms" style={{color: "white"}}>CHAT ROOMS</a></li>
                        <li><a href="/homepage" style={{color: "white"}}>HOME</a></li>
                    </ul>
                </div>
            </nav>

            <Carousel>
                <img
                    className="d-block img-fluid"
                    src={uta} //will change - was for testing
                />
                <h3>Mav Up</h3>
                <img
                    className="d-block img-fluid"
                    src={capture} //will change - was for testing
                />
                <h3>CAPS</h3>
            </Carousel>
        </div>
    );
}

export default Resources;