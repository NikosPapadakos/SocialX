import React, { useState }  from 'react';
import '../css/signup.css';
import logo from '../assets/socialx.png';
import { Link, useHistory }  from 'react-router-dom';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();
const axios = require('axios');
const api = process.env.REACT_APP_API;


export default function SignUp() {
    const history = useHistory();

    const [usernameClass, setUsernameClass] = useState(0);
    const [usernameMsg, setUsernameMsg] = useState();
    const [emailClass, setEmailClass] = useState(0);
    const [emailMsg, setEmailMsg] = useState();
    const [passwordClass, setPasswordClass] = useState(0);
    const [passwordMsg, setPasswordMsg] = useState();   

    const testUsername = /^[a-zA-Z0-9_-]{3,18}$/i;
    //alpha numeric lower and upper case _-
    const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    const testPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;
    //Minimum eight characters, at least one letter, one number and one special character

    const handleEmail = () => {
        let mail = document.querySelector('.email').value;
        
        if(mail.length>5){
            if(testEmail.test(mail)){
                setEmailClass('correct');
                setEmailMsg('Looks good!');
            }else{
                setEmailClass('incorrect');
                setEmailMsg('Please enter a valid email');
            }
        }

        if(emailClass == 'correct'){
            
            
            let emailForm = new FormData();
            
            emailForm.append('email', mail);
                
        
            axios.post(`${api}/checkEmail.php`, emailForm).then(function (response) {
                    
                if(response.data.status == 0){
                       
                    setEmailClass('incorrect');
                    setEmailMsg('Email already exists.');
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
            
           
        }
       
    };

    const handleUsername = () => {
        let user = document.querySelector('.username-input').value;


        if(user.length>2){
            if(testUsername.test(user)){
                setUsernameClass('correct');
                setUsernameMsg('Looks good!');
            }else{
                setUsernameClass('incorrect');
                setUsernameMsg('Username can contain alphanumeric and -_ char.');
            }
        }

        if(user.length<3) {
            setUsernameClass('incorrect');
            setUsernameMsg('Username must be at least 3 characters long');
        }

        if(user.length>18) {
            setUsernameClass('incorrect');
            setUsernameMsg('Username must be between 3 and 18 chars.');
        }

        if(usernameClass == 'correct'){
           
            
            let userForm = new FormData();
            
            userForm.append('username', user);
                
        
            axios.post(`${api}/checkUsername.php`, userForm).then(function (response) {
                    
                if(response.data.status == 0){
                       
                    setUsernameClass('incorrect');
                    setUsernameMsg('Username already exists.');
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
            
            
        }
        
       


        
        
        
    };

    const handlePassword = () => {
        let pass = document.querySelector('.password').value;

        if(pass.length>8){
            if(testPassword.test(pass)){
                setPasswordClass('correct');
                setPasswordMsg('Looks good!');
            }else{
                setPasswordClass('incorrect');
                setPasswordMsg('Must contain at least one letter, one number and one special character');
            }
        }else {
            setPasswordClass('incorrect');
            setPasswordMsg('Password must contain at least 8 char.');
        }
        
    };


    

    const _createUser =  () => {
        let username = document.querySelector('.username-input').value;
        let email = document.querySelector('.email').value;
        let password = document.querySelector('.password').value;

        if(username.length == 0){
            setUsernameClass('incorrect');
            setUsernameMsg('Username cannot be empty');
        }

        if(email.length == 0 ){
            setEmailMsg('Email cannot be empty');
            setEmailClass('incorrect');
        }

        if(password.length == 0){
            setPasswordClass('incorrect');
            setPasswordMsg('Password cannot be empty');
        }

        if(passwordClass == 'correct' && usernameClass == 'correct' && emailClass == 'correct'){
            setTimeout(function(){  
            
                let data = new FormData();
        
                data.append('username', username);
                data.append('email', email);
                data.append('password', password);

                axios.post(`${api}/createUser.php`, data).then(function (response) {
                
                    if(response.data.status == 1){
                   
                        cookies.set('token', response.data.payload.token);
                        history.push({
                            pathname: '/homepage',
                            state: { token: response.data.payload.token }
                        });
                    }else {
                        swal({
                            title: 'Oops..',
                            text: 'Something went wrong while processing your sign up. Please try again later.',
                            icon: 'error',
                            
                        })
                            .then(()=>
                                location.reload()
                            );
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
           
            }, 500);
        }

    };

    return (
        <div className='img-wrapper'>
            <img className='logo-signIn' src={logo} alt='socialX'></img>
            <div className='signUp-container'>
                <header className='title'>Sign Up</header>
                <label className='email-label'>Email</label>
                <input placeholder='example@email.com' onChange={()=>handleEmail()} className={emailClass == 0 ? 'email' : `email ${emailClass}`} type='text'/>
                <small className={emailMsg == 'Looks good!' ? 'emailMsg correctMsg' : 'emailMsg incorrectMsg'}>{emailMsg}</small> 
                <label className='username-label'>Username</label>
                <input placeholder='eg. John-Doe_23' onChange={()=>handleUsername()} className={usernameClass == 0 ? 'username-input' : `username-input ${usernameClass}`} type='text'/>
                <small className={usernameMsg == 'Looks good!' ? 'userMsg correctMsg' : 'userMsg incorrectMsg'}>{usernameMsg}</small> 
                <label className='pass-label'>Password</label>
                <input placeholder='eg. Password1!' onChange={()=>handlePassword()} className={passwordClass == 0 ? 'password' : `password ${passwordClass}`} type='password'/>
                <small className={passwordMsg == 'Looks good!' ? 'passMsg correctMsg' : 'passMsg incorrectMsg'}>{passwordMsg}</small>
                <button onClick={()=>_createUser()} className='button'>Sign Up</button>
                <Link  className='signUp' to='/signin' >Already have an account? Sign in!</Link>
            </div>
        </div>
    );
}