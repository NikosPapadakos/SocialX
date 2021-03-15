import React, { useState, useEffect } from 'react';
import Nav from './HomepageElements/Nav';
import Main from './HomepageElements/Main';
import Friends from './HomepageElements/Friends';
import  '../css/homepage.css';
import Cookies from 'universal-cookie';
import { useHistory }  from 'react-router-dom';
const axios = require('axios');
const api = process.env.REACT_APP_API;
const cookies = new Cookies();


export default function Homepage() {
    const token = cookies.get('token');
    const [userData, setUserData] = useState({});
    const history = useHistory();
    useEffect(() => {
        let form = new FormData();
        form.append('token', token);
        axios.post(`${api}/readUser.php`, form).then(function (response) {
            if(response.data.status == 1){
                console.log(response.data.payload);
                setUserData(response.data.payload);
            }else {
                history.push({
                    pathname: '/signin'
                });
            }
            
        })
            .catch(function (error) {
                console.log(error);
            });
        
    }, []);
   
    return (
        <div className="home-container">
            <Nav data={userData}/>
            <div className="main-container">
                <Main/>
                <Friends/>
            </div>
        </div>    
    );
}
