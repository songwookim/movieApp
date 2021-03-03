// 여기가 store인듯? reducers갖고 있으니까
import {
    LOGIN_USER
} from "../_actions/types"

export default function(state ={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // nextState를 return하자. 이때 spread Operator를 사용해서 넘긴다.
            // (previousState, action) => nextState
            // payload를 loginSuccess에다 넘김
            return {...state, loginSuccess: action.payload};
            break;
    
        default:
            return state;
    }
}