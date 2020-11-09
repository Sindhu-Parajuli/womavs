import React, {useState, Component, Fragment} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App";
import {BrowserRouter, Route} from "react-router-dom";
import Homepage from "./Homepage";
import Signin from "./Signin";
import Register from "./Register";
import Profile from "./Profile";
import ForgotPassword from "./ForgotPassword"
import Resources from "./Resources";
import Chatroom from "./Chatroom";
import Announcement from "./Announcement";
import About from "./About"


export class RenderApp extends React.Component {
    renderMain() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route path={"/"} exact component={App}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/homepage"} exact component={Homepage}/>
                    <Route path={"/signin"} exact component={Signin}/>
                    <Route path={"/resources"} exact component={Resources}/>
                    <Route path={"/profile"} exact component = {Profile}/>
                    <Route path={"/chatroom"} exact component={Chatroom}/>
                    <Route path={"/forgotpassword"} exact component={ForgotPassword}/>
                    <Route path={"/announcement"} exact component={Announcement}/>
                    <Route path={"/about"} exact component={About}/>
                </Fragment>
            </BrowserRouter>
        );
    }

    render() {
        return this.renderMain();
    }
}

export default RenderApp;
