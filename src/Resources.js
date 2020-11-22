import caps from "./images/caps.jpg";
import swe from "./images/swe.png";
import awm from "./images/awm.jpg";
import das from "./images/das.jpg";
import WOG from "./images/WOG.jpg";
import wib from "./images/wib.PNG"
import React, {Component} from "react";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import {Carousel} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import firebase from "./firebase";
import "./css/Resources.css";
import Navigation from "./Navbar"

const Resources=(logout) => {

    const history = useHistory();

   const signout = () => {
        firebase.auth().signOut().then(()=>{
                //this.store.dispatch('clearData')
                history.push("/Signin");
            }
        );
    }

    return (
        <div>
            <div>
                <Navigation/>
            </div>
                <Carousel>
                    <Carousel.Item >
                        <h2><a href="http://www.uta.edu/caps" style={{color: "rgb(245,128,38)"}}>Counseling and Psychological Services (CAPS)</a></h2>
                        <img className="d-inline-block rounded-circle w-25" style={{marginBottom:150}} src={caps}/>
                        <Carousel.Caption>
                            <div className="carousel-caption">
                                <h3 style={{ color: "rgb(245,128,38)"}}>UT Arlington Counseling and Psychological Services (CAPS) is committed to helping students meet their full personal, academic, and career potential. Services are available to help students increase their understanding of personal issues, address mental and behavioral health problems, and make positive changes in their lives.</h3>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/women-of-gold" style={{color: "rgb(245,128,38)"}}>Women Of Gold</a></h2>
                        <img className="d-inline-block rounded-circle mw-50" src={WOG}/>
                        <Carousel.Caption>
                            <h3 style={{color: "rgb(245,128,38)"}}>We are women promoting and encouraging other women to exemplify Grace, Optimism, Love & Dignity throughout the collegiate experience.
                            </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/societyofwomenengineers" style={{color: "rgb(245,128,38)"}}>UTA Society of Women Engineers</a></h2>
                        <img className="d-inline-block rounded-circle w-25"  style={{marginBottom:150}} src={swe}/>
                        <Carousel.Caption>
                            <h3 style={{color: "rgb(245,128,38)"}}>Empower women to achieve full potential in careers as engineers and leaders, expand the image of the engineering and technology professions as a positive force in improving the quality of life, and demonstrate the value of diversity and inclusion.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/awm" style={{color: "rgb(245,128,38)"}}>UTA Association of Women in Mathematics</a></h2>
                        <img className="d-inline-block rounded-circle w-25"  style={{marginBottom:150}} src={awm}/>
                        <Carousel.Caption>
                            <h3 style={{color: "rgb(245,128,38)"}}>The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences.We aim to promote equal opportunity and equal treatment of women and girls in the mathematical sciences.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/women-in-business" style={{color: "rgb(245,128,38)"}}>UTA Women in Business</a></h2>
                        <img className="d-inline-block rounded-circle w-25"  style={{marginBottom:190}} src={wib}/>
                        <Carousel.Caption>
                            <h3 style={{color: "rgb(245,128,38)"}}>Our mission is to change the perceived limitations and misconceptions of women in the business field. Our objective is to provide an environment where members can engage with peers and business professionals to acquire the necessary resources to reach their full potential as confident and capable business professionals.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h2><a href="https://mavorgs.campuslabs.com/engage/organization/das" style={{color: "rgb(245,128,38)"}}>UTA Delta Alpha Sigma Multicultural Sorority</a></h2>
                        <img className="d-inline-block rounded-circle w-25" style={{marginBottom:150}} src={das}/>
                        <Carousel.Caption>
                            <h3 style={{color: "rgb(245,128,38)"}}>To create a sisterhood of longevity through values and purpose<br/>
                                • To build confidence in ourselves and in each other <br/>
                                • To lead each other to personal and organizational success<br/>
                                • To make our community a better place for those who are here now and after us<br/>
                            </h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
    );
}

export default Resources;