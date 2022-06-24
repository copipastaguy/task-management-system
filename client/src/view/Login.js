// Handle the login function and route

// routes
// /auth the user inputs

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // user login details
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // try {
    //   // fetch POST statement to localhost:3002/login
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(username, password);
    navigate("/user-management");
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="/auth" method="post" onSubmit={handleSubmit}>
        <label>
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>
          <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
