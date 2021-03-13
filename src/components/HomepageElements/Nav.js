import React from 'react';
import '../../css/nav.css';
import logo from '../../assets/socialx.png';
import home from '../../assets/home.png';
import { BiChat, BiSearch, BiBell, BiMenu } from 'react-icons/bi';


export default function Navigator() {
  

    return (
        <div className="nav-container">
            <span className="left-col">
                <img className="logo" src={logo}></img>
                <span className="search-container">
                    <input className="search-bar" type="text" />
                    <BiSearch className="optic" color="black" style={{ marginRight: '10' }} size={30} />
                </span>
            </span>


            <span className="mid-options">
                <img className="home"  src={home}></img>
                <BiChat className="chat" color="white"/>
            </span>

            <span className="right-options">
                <span className="username"><img className="avatar"></img> Username</span>
                <BiBell className="bell" color="white" style={{ marginRight: '10' }}  />
                <BiMenu className="menu" color="white" style={{ marginRight: '20' }}  />
            </span>

            <BiMenu className="second-menu" color="white"/>
        </div>

    );
}
