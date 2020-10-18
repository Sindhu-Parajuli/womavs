import React, {useState, Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App";
import {BrowserRouter, Route} from "react-router-dom";
import Homepage from "./Homepage";
import Signin from "./Signin";
import Register from "./Register";
import Profile from "./Profile";

export class RenderApp extends React.Component {
    renderMain() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route path={"/"} exact component={App}/>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/homepage"} exact component={Homepage}/>
                    <Route path={"/signin"} exact component={Signin}/>
                    <Route path={"/profile"} exact component = {Profile}/>
                </Fragment>
            </BrowserRouter>
        );
    }

    render() {
        return this.renderMain();
    }
}

export default RenderApp;
