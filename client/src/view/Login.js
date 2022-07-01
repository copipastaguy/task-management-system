import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FlashMessages from "./FlashMessages";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });
      if (response.data) {
        // returns array of data
        console.log(response);
        localStorage.setItem("username", response.data[0].username);

        // CONDITIONAL RENDERING BASED ON USER GROUP
        const isAdmin = response.data[0].admin_privilege;
        if (isAdmin === 1) {
          console.log("directing to management page");
          navigate("/management");
        } else {
          console.log("directing to task page");
          navigate("/tasks");
        }
      } else {
        // RESET FIELDS
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <FlashMessages />

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
    </div>
  );
};

export default Login;
