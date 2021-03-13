import React from 'react';
import Nav from './HomepageElements/Nav';
import Main from './HomepageElements/Main';
import Friends from './HomepageElements/Friends';
import  '../css/homepage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export default function Homepage() {
    
    return (
        <div className="home-container">
            <Nav/>
            <div className="main-container">
                <Main/>
                <Friends/>
            </div>
        </div>    
    );
}
