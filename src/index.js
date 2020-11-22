import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from "./firebase.js";
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import RenderApp from "./RenderApp";



ReactDOM.render(
            <RenderApp></RenderApp>,
    document.getElementById('root')
);




serviceWorker.unregister();
