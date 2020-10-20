import capture from "./images/Capture.PNG";
import caps from "./images/caps.jpg";
import swe from "./images/swe.jpg";
import awm from "./images/awm.jpg";
import das from "./images/das.jpg"
import React, {Component} from "react";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"
import {Carousel} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";


const Resources=(logout) => {

    const history = useHistory();

    const signout = () => {
        firebase.auth().signOut().then(history.push("/Signin"));

    }

    return (
            <div>
                <nav style={{background: "rgb(0,100,177)"}}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <img id={"lo"} src={capture} height={75} width={100} className="rounded float-left"
                                     alt="..."/></a>
                            <br></br><h1 style={{textAlign: "center", color: "white"}}>Resource Page</h1>
                        </div>
                        <ul className="nav navbar-nav" style={{textAlign: "right"}}>
                            <li className="active"><a href="/resources" style={{color: "white"}}>RESOURCES</a></li>
                            <li><a href="/chatroom" style={{color: "white"}}>CHAT ROOMS</a></li>
                            <li><a href="/homepage" style={{color: "white"}}>HOME</a></li>
                            <li><a onClick={signout} style={{color:"white"}}>LOGOUT</a></li>
                        </ul>
                    </div>
                </nav>
                <Carousel>
                    <Carousel.Item>
                        <h2><a href="http://www.uta.edu/caps" style={{color: "rgb(245,128,38)"}}>UTA CAPS: </a></h2>
                        <img className="rounded float-left" src={caps}/>
                        <p>UT Arlington Counseling and Psychological Services (CAPS) is committed to helping students meet their full personal, academic, and career potential. Services are available to help students increase their understanding of personal issues, address mental and behavioral health problems, and make positive changes in their lives.</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/societyofwomenengineers" style={{color: "rgb(245,128,38)"}}>UTA Society of Women Engineers</a></h2>
                        <img className="rounded float-left" height={180} src={swe}/>
                        <p>Empower women to achieve full potential in careers as engineers and leaders, expand the image of the engineering and technology professions as a positive force in improving the quality of life, and demonstrate the value of diversity and inclusion.</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/awm" style={{color: "rgb(245,128,38)"}}>UTA Association of Women in Mathematics</a></h2>
                        <img className="rounded float-left" src={awm}/>
                        <p>The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences. We aim to promote equal opportunity and equal treatment of women and girls in the mathematical sciences.</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/das" style={{color: "rgb(245,128,38)"}}>UTA Delta Alpha Sigma Multicultural Sorority</a></h2>
                        <img className="rounded float-left" height={200} src={das}/>
                        <p>To create a sisterhood of longevity through values and purpose<br/>
                            • To build confidence in ourselves and in each other <br/>
                            • To lead each other to personal and organizational success<br/>
                            • To make our community a better place for those who are here now and after us<br/>
                            • To grow as better individuals through our sisterhood<br/>
                            • To celebrate women through group activities, service, and activism
                        </p>
                    </Carousel.Item>
                </Carousel>
            </div>
    );
}

export default Resources;