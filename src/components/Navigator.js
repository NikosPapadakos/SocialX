import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Homepage from './Homepage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';



export default function Navigator() {
    return (
        <Router>
            <Switch>
                <Route path="/signin">
                    <SignIn/>
                </Route>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/homepage">
                    <Homepage/> 
                </Route>
            </Switch>
        </Router>
    );
}
