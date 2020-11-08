import * as actionTypes from '../actions/types';
const user_reducer = (state,action) => {
    switch(action.type){
        case actionTypes.SET_USERNAME:
            return{
                currentUser:action.payload.currentUser,
                isLoading:false
            }
        default:
                return state;
    }

}