// page for new user to create an account

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  // logic to create new user based on data
  const navigate = useNavigate();
  const newUser = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) throw new Error('Username is already taken');
      else if (response.ok) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div className="register">
      <div className="registerInput"></div>
    </div>
  );
}
export default RegisterPage;

function LoginPage() {
  return (
    <div className="login">
      <div className="loginInput">
        <p id="username">Username</p>
        <input type="text" name="username" id="username" />
        <p id="password">Password</p>
        <input type="text" name="password" id="password" />
        <button
          className="loginButton"
          id="loginButton"
          onClick={() => verifyUser()}
        >
          Login
        </button>
        <Link to="/register" className="newUser" id="newUser">
          Create Account
        </Link>
      </div>
    </div>
  );
}
