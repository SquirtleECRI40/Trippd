import React from "react";
import { Link } from 'react-router-dom';

function LoginComponent() {
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

      if (!response.ok) thro

    }

  }
}

export default LoginComponent;
