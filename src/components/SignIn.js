import React from 'react';
import '../css/signin.css';
import logo from '../assets/socialx.png';

export default function SignIn() {
    return (
        <div class="img-wrapper">
            <img className="logo" src={logo}></img>
        <div className="signin">
            <label className="email-label">Email</label>
            <input className="email" type="text"/>
            <label className="pass-label">Password</label>
            <input className="password" type="password"/>
            <button className="button">Sign In</button>
        </div>
        </div>
    )
}
