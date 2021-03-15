import React from 'react';
import PropTypes from 'prop-types';
import '../../css/nav.css';
import logo from '../../assets/socialx.png';
import home from '../../assets/home.png';
import { BiChat, BiSearch, BiBell, BiMenu, BiLogOut } from 'react-icons/bi';
import swal from 'sweetalert';
import { useHistory }  from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



Navigator.propTypes = {
    data: PropTypes.object
};


export default function Navigator({data}) {
   
   

    const {username} = data;

    const history = useHistory();

    const logOut=()=>{
        cookies.remove('token');
        history.push({
            pathname: '/signin'
        });
    };

    const logOutModal = () => {
        swal({
            title: 'Log Out',
            text: 'Do you want to log out?',
            icon: 'warning',
            buttons: ['No', 'Yes'],
            className: 'logOut-modal'
        })
            .then((value)=>
                value ? logOut():null
            );
    };

    return (
        <div className='nav-container'>
            <span className='left-col'>
                <img className='logo' src={logo}></img>
                <span className='search-container'>
                    <input className='search-bar' type='text' />
                    <BiSearch className='optic' color='black' style={{ marginRight: '10',  cursor: 'pointer' }} size={30} />
                </span>
            </span>


            <span className='mid-options'>
                <img className='home'  src={home}></img>
                <BiChat className='chat' color='white'/>
            </span>

            <span className='right-options'>
                <span className='username'><img className='avatar'></img>{username}dfewfefewfefefw</span>
                <BiBell className='bell' color='white' style={{ marginRight: '10' }}  />
                <BiLogOut onClick={()=>logOutModal()} className='log-out' color='white' style={{ marginRight: '20' }}  />
            </span>

            <BiMenu className='second-menu' color='white'/>
        </div>

    );
}
