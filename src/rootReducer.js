import {combineReducers} from 'redux';
import mainReducer from "./mainReducer";

const rootReducer = combineReducers({
    mainReducer: mainReducer,
});

export default rootReducer;