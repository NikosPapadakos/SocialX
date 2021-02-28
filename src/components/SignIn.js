/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../css/signin.css';
import logo from '../assets/socialx.png';
import { Link }  from 'react-router-dom';
const axios = require('axios');
const api = process.env.REACT_APP_API;


export default function SignIn() {

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
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
            
    };

    return (
    
        <div className='img-wrapper'>
            <img className='logo-signIn' src={logo} alt='socialX'></img>
            <div className='signIn-container'>
                <header className='title'>Sign In</header>
                <label className='email-label'>Email or Username</label>
                <input className='email' type='text'/>
                <label className='pass-label'>Password</label>
                <input className='password' type='password'/>
                <button onClick={()=>_authenticateUser()} className='button'>Sign In</button>
                <Link className='signUp' to='/signup'>Don't have an account? Sign up!</Link>
            </div>
        </div>
     
    );
}
