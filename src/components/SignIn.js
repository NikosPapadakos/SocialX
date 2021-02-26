/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import '../css/signin.css';
import logo from '../assets/socialx.png';
import { Link }  from 'react-router-dom';
const axios = require('axios');


export default function SignIn() {

    const testApi =  () => {
        axios.post('http://localhost:80/SocialX/backendServices/test.php', {
            
        })
            .then(function (response) {
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
                <label className='email-label'>Email</label>
                <input className='email' type='text'/>
                <label className='pass-label'>Password</label>
                <input className='password' type='password'/>
                <button onClick={()=>testApi()} className='button'>Sign In</button>
                <Link className='signUp' to='/signup'>Don't have an account? Sign up!</Link>
            </div>
        </div>
     
    );
}
