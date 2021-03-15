/* eslint-disable react/no-unescaped-entities */
import React, { useState }  from 'react';
import '../css/signin.css';
import logo from '../assets/socialx.png';
import { Link, useHistory }  from 'react-router-dom';
const axios = require('axios');

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const api = process.env.REACT_APP_API;
const main = process.env.REACT_APP_MAIN;



export default function SignIn() {
    const [auth, setAuth] = useState(0);
    const history = useHistory();
    const _authenticateUser =  () => {
        let user = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
        let data = new FormData();
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if(testEmail.test(user)){
            data.append('email', user);
            data.append('password', password);
        }else {
            data.append('username', user);
            data.append('password', password);
        }
        axios.post(`${api}/authenticateUser.php`, data).then(function (response) {
            console.log(response.data.status);
            if(response.data.status == 1){
                setAuth(0);
                cookies.set('token', response.data.payload.token);
                history.push({
                    pathname: '/homepage',
                    state: { token: response.data.payload.token }
                });
            }else{
                setAuth(1);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
     
    };


   

    return (
    
        <div className='img-wrapper'>
            <img className='logo-signIn' src={logo} alt='socialX'></img>
            <div className='signIn-container'>
                <header className='title-signin'>Sign In</header>
                <label className='email-label'>Email or Username</label>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        _authenticateUser();
                    }
                }} className='email' type='text'/>
                <label className='pass-label'>Password</label>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        _authenticateUser();
                    }
                }} className='password' type='password'/>
                <button  onClick={()=>_authenticateUser()} className='button-signIn'>Sign In</button>
                <h3 className={auth == 0 ? 'alert-hide' : 'alert'}>Invalid credentials</h3>
                <Link className='signUp' to='/signup'>Don't have an account? Sign up!</Link>
            </div>
        </div>
     
    );
}
