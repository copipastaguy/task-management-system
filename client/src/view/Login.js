import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/auth", {
        username: "admin",
        password: "admin",
      });
      console.log("user login");
      // console.log(response.data);
      // navigate("/management");
    } catch (error) {
      console.log(error.response);
    }
  };

  // const handleChange = (e) => {
  //   setUserDetails({ [e.target.id]: e.target.value });
  // };

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        className="form-container"
        // action="/auth"
        // method="post"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            <i className="fas fa-user"></i>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            // required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>
            <i className="fas fa-lock"></i>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            // required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
