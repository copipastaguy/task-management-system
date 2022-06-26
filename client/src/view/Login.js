import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // user login details
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch POST statement to localhost:3002/login and data to send
      const response = await fetch("http://localhost:3002/login", {
        username,
        password,
      });
      if (response.data) {
        // logged in
        // localstorage for username password
        console.log("logged in");
      }
    } catch (e) {
      console.log(e);
    }
    console.log(username, password);
    navigate("/user-management");
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        className="form-container"
        action="/auth"
        method="post"
        onSubmit={handleSubmit}
      >
        <label>
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          placeholder="Username"
          value="test"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>
          <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          placeholder="Password"
          value="test"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
