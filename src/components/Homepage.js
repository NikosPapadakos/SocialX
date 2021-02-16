import React from 'react';
import Nav from './HomepageElements/Navigator';
import Main from './HomepageElements/Main';
import Friends from './HomepageElements/Friends';
import  '../css/homepage.css'

export default function Homepage() {
    return (
        <div className="home-container">
            <Nav/>
            <div className="main-container">
                <Main/>
                <Friends/>
            </div>
           
        </div>
    )
}
