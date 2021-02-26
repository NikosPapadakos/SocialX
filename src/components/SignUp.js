import React from 'react';
import '../css/signup.css';
import logo from '../assets/socialx.png';
import { Link } from 'react-router-dom';
const api = process.env.REACT_APP_API;

export default function SignUp() {
    return (
        <div className='img-wrapper'>
            <img className='logo-signIn' src={logo} alt='socialX'></img>
            <div className='signIn-container'>
                <header className='title'>Sign Up {`${api}`}</header>
                <label className='email-label'>Email</label>
                <input className='email' type='text'/>
                <label className='pass-label'>Password</label>
                <input className='password' type='password'/>
                <button className='button'>Sign Up</button>
                <Link className='signUp' to='/signin' >Already have an account? Sign in!</Link>
            </div>
        </div>
    );
}