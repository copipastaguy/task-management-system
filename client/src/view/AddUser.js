import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [enable, setEnable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      // const response = await axios.get("/accounts");
      const response = await axios.post("/add", {
        // username: "project_lead",
        // password: "lead!123",
        // email: "lead@gmail.com",
        // group: 1,
        username,
        password,
        email,
        group,
        enable,
      });
      console.log(response);

      navigate("/management");

      // reset form field
      setUsername("");
      setPassword("");
      setEmail("");
      setGroup("");
    } catch (error) {
      console.log(error.response);
    }
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
            onChange={(e) => setUsername(e.target.value)}
            // required
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
            onChange={(e) => setPassword(e.target.value)}
            // required
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
            <p>group</p>
          </label>

          <select onChange={(e) => setGroup(e.target.value)}>
            <option value="select"></option>
            <option value="1">Project Lead</option>
            <option value="2">Project Manager</option>
            <option value="3">Team Member</option>
          </select>
          {group}
        </div>

        <div>
          <label htmlFor="disable">
            <p>Enable ?</p>
          </label>
          <select value={enable} onChange={(e) => setEnable(e.target.value)}>
            <option></option>
            <option value="1">Enable</option>
            <option value="false">Disable</option>
          </select>
          <p>{enable}</p>
        </div>

        <div>
          <input type="submit" value="Add User" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
