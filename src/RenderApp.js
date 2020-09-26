import React, {useState, Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App";
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard from "./dashboard";

export class RenderApp extends React.Component {
    renderMain() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Route path={"/"} exact component={App}/>
                    <Route path={"/dashboard"} exact component={Dashboard}/>
                </Fragment>
            </BrowserRouter>
        );
    }

    render() {
        return this.renderMain();
    }
}

export default RenderApp;
