// introduction to our application, button to login/signup

import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import '../styles/style.css';
import logo from '../assets/trippd_logo.png';

function SplashPage(){
  return (
  // for returning a single div
    <div id = "splashwrapper">
      <div id = "splashbuttonwrapper">
        <Link to="/register">
          <button className = "splashbutton">Register</button>
        </Link>
        <Link to="/login">
          <button className = "splashbutton">Login</button>
        </Link>
        <Link to="/createTrip">
          <button className = "splashbutton">Create Trip</button>
        </Link>
        <Link to="/tripDashboard/1">
          <button className = "splashbutton">Trip Dashboard</button>
        </Link>
      </div>
      <div className = "logotitlewrapper">
        <img id = "logo" src={logo}></img><p id = "splashtitle">trippd</p>
      </div>
    </div>
  );
}
export default SplashPage;