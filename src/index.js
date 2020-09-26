import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from "firebase";
import * as serviceWorker from './serviceWorker';
import RenderApp from "./RenderApp";



ReactDOM.render(<RenderApp/>,document.getElementById("root"));



serviceWorker.unregister();
