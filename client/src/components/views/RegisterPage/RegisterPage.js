import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch();   

    const [Email, setEmail] = useState("") ;
    const [Name, setName] = useState("") ;
    const [Password, setPassword] = useState("") ;
    const [ConfirmPassword, setConfirmPassword] = useState("") ;

    const onEmilHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // axios.post('api/users/register', ...) 이 코드만으로 해결되기는 함
        if(Password !== ConfirmPassword)
            return alert('비밀번호와 비밀번호 확인이 다릅니다.')

        let body = {
            email: Email,
            name: Name,
            password: Password
        }
        dispatch(registerUser(body)) 
            .then(res => {
            if(res.payload.loginSuccess) {
                props.history.push('/')
            } else {
                alert('Error');
            }
        });
    }
    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
               <label>Email</label>
               <input type="email" value={Email} onChange={onEmilHandler}/>

               <label>Name</label>
               <input type="text" value={Name} onChange={onNameHandler}/>

               <label>Password</label>
               <input type="Password" value={Password} onChange={onPasswordHandler}/>

               <label>Confirm Password</label>
               <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

               <br />
               <button>
                   Sign in
                </button> 
            </form>
        </div>
    )
}

export default RegisterPage