import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from "./firebase.js";
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import RenderApp from "./RenderApp";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";


ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>

            <RenderApp></RenderApp>,
            </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
