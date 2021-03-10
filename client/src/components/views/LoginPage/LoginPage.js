import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
import {Button} from 'antd'

function LoginPage(props) {
    const dispatch = useDispatch();   

    //안에서는 state를 변화를 시켜서 데이터를 바꾼다.
    //useState + Enter
    const [Email, setEmail] = useState("") ;
    const [Password, setPassword] = useState("") ;

    //타이핑 할 때마다 re-rendering되기에 타이핑할 때마다 state를 바꿔주는 메소드 정의하자.
    const onEmilHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    //버튼을 눌렀을 때 작동하는 메소드
    const onSubmitHandler = (event) => {
        console.log(1)
        //이벤트 일어날 때마다 새로고침 되는 거 방지
        event.preventDefault();
        // state안에 서버에 보내고자 하는 값들이 있음(Password, state)
        let body = {
            email: Email,
            password: Password
        }
        // action을 갖고 reducers로 이동 후(index.js에 store정의 있음) Landing이 완료되면 시작 페이지로 이동
        dispatch(loginUser(body))                      //const dispatch = useDispatch(); 
            // return {...state, loginSuccess: action.payload}; 
            .then(res => {
            if(res.payload.loginSuccess) {
                window.localStorage.setItem('userId', res.payload.userId);
                //리액트의 페이지 이동 방법
                props.history.push('/')
            } else {
                alert(res.payload.message);
            }
        });
    }
    const onRegitserHandler = () => {
        props.history.push('/register');
    }
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', height: '100vh', flexDirection: 'column'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
               <label>Email</label>
               <input type="email" value={Email} onChange={onEmilHandler}/>
               <label>Password</label>
               <input type="Password" value={Password} onChange={onPasswordHandler}/>
               <br />
               <Button htmlType="submit">
                   Login
                </Button> 
            </form>
            <Button onClick={onRegitserHandler} style={{marginTop: '10px'}} >
                Register
            </Button>
        </div>
    )
}
export default withRouter(LoginPage)
