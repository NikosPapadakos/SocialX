import React from 'react';
import Nav from './HomepageElements/Navigator';
import Main from './HomepageElements/Main';
import Friends from './HomepageElements/Friends';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import  '../css/homepage.css';


export default function Homepage() {
    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/">
                    <div className="home-container">
                        <Nav/>
                        <div className="main-container">
                            <Main/>
                            <Friends/>
                        </div>
                    </div>    
                </Route>
            </Switch>
        </Router>
    );
}
