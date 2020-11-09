import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from "./firebase.js";
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import RenderApp from "./RenderApp";
import { createStore } from 'redux';
import { Provider,connect } from 'react-redux';
import { composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers";


const store = createStore(rootReducer , composeWithDevTools());

ReactDOM.render(
    <Provider store = {store}>
        <RenderApp></RenderApp>
    </Provider>,
    document.getElementById('root')
);




serviceWorker.unregister();
