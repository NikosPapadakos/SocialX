import React from 'react';
import '../css/signup.css';
import logo from '../assets/socialx.png';
import { Link } from 'react-router-dom';
const axios = require('axios');
const api = process.env.REACT_APP_API;

export default function SignUp() {

    const _createUser =  () => {
        let username = document.querySelector('.username-input').value;
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;
        let data = new FormData();
        // var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        data.append('username', username);
        data.append('email', email);
        data.append('password', password);

        axios.post(`${api}/createUser.php`, data).then(function (response) {
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
                <header className='title'>Sign Up</header>
                <label className='email-label'>Email</label>
                <input className='email' type='text'/>
                <label className='username-label'>Username</label>
                <input className='username-input' type='text'/>
                <label className='pass-label'>Password</label>
                <input className='password' type='password'/>
                <button onClick={()=>_createUser()} className='button'>Sign Up</button>
                <Link  className='signUp' to='/signin' >Already have an account? Sign in!</Link>
            </div>
        </div>
    );
}