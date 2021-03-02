import {combineReducers} from 'redux';
//import user from './user_reducer';
//import comment from './comment_reducer';

//store에는 여러 Reducer가 있는데, combineReducers 메소드를 이용해 하나로 통합관리
const rootReducer = combineReducers({
    //user,
    //comment
})

export default rootReducer;