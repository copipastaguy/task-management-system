import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, SetRole] = useState("");
  const [enable, setEnable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/add", {
        username,
        password,
        email,
        role,
      });
      console.log(response);

      // reset form field
      setUsername("");
      setPassword("");
      setEmail("");
      SetRole("");
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
    navigate("/management");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add user</h2>
        <div>
          <label htmlFor="username">
            <p>username</p>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            <p>password</p>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">
            <p>email</p>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newGroup">
            <p>role</p>
          </label>

          <select value={role} onChange={(e) => SetRole(e.target.value)}>
            <option></option>
            <option value="Admin" selected>
              Admin
            </option>
            <option value="Project Lead">Project Lead</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Team Member">Team Member</option>
          </select>
        </div>

        {/* <div>
          <label htmlFor="disable">
            <p>Enable ?</p>
          </label>
          <select value={enable} onChange={(e) => setEnable(e.target.value)}>
            <option></option>
            <option value="1">Enable</option>
            <option value="false">Disable</option>
          </select>
        </div> */}

        <div>
          <input type="submit" value="Add User" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
