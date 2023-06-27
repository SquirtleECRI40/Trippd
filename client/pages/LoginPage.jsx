// displays for user to log in

import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  console.log('in login page');
  const navigate = useNavigate();
  //logic to verify username and password are valid
  const verifyUser = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });

      if (!response.ok) throw new Error('Incorrect username or password');
      else if (response.ok) {
        navigate('/dashboard');
      }
    }
    catch (err) {
      console.log('Error:', err);
    }

  };

  return (
    <div className="login">
      <div className="loginInput">
        <p id="username">Username</p>
        <input type="text" name="username" id="username"/>
        <p id="password">Password</p>
        <input type="text" name="password" id="password"/>
        <button className="loginButton" id="loginButton" onClick={() => verifyUser()}>
          Login
        </button>
        <Link to="/register" className="newUser" id="newUser" >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;