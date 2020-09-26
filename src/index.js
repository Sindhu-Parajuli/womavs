import React from 'react';
import {render} from 'react-dom'
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from "firebase";
import * as serviceWorker from './serviceWorker';
import RenderApp from "./RenderApp";
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import configureStore from "./configurestore";

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
)