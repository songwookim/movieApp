import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER
} from "./types";

//데이터의 Passwrod, email을 파라미더로 받기
export function loginUser(dataToSubmit) {
    //400 : not found / 404 : bad request
    const req = axios.post('/api/users/login', dataToSubmit)
    //post 방식으로 날린다음 req에 저장함.
    .then(res=> res.data)

    //Reducer에 저장함.
    return {
        type: LOGIN_USER,
        payload: req
    }
}

export function registerUser(dataToSubmit) {
    const req = axios.post('/api/users/register', dataToSubmit)
    .then(res=> res.data)

    return {
        type: REGISTER_USER,
        payload: req
    }
}