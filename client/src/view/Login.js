import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // user login details
  // const [userdetails, setUserDetails] = useState({
  //   username: "",
  //   password: "",
  // });

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // post request not working
    // const url = "/auth";
    // fetch POST statement to url and data to send
    // axios
    //   .post("http://localhost:3002/auth", {
    //     username: "admin ",
    //     password: "admin",
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     // setData(response.data);
    //   })
    //   .catch((error) => console.log(error));

    // get request works
    try {
      const response = await axios.get("/accounts");
      console.log(response);
    } catch (error) {
      console.log(error);
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
        method="post"
        onSubmit={handleSubmit}
      >
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

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
