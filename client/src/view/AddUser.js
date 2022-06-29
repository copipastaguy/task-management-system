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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      // const response = await axios.get("/accounts");
      const response = await axios.post("/add", {
        username: "admin2",
        password: "admin2",
        email: "test@test.com",
        group: "Project Lead",
      });
      console.log(response);
      if (response) {
        console.log("user added");
        navigate("/management");

        // reset form field
        setUsername("");
        setPassword("");
        setEmail("");
        setGroup("");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
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
          {/* <input
            type="text"
            name="newGroup"
            placeholder="User Group"
            id="newGroup"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          /> */}
          <select onChange={(e) => setGroup(e.target.value)}>
            <option value="select"></option>
            <option value="project_lead">Project Lead</option>
            <option value="project_manager">Project Manager</option>
            <option value="team_member">Team Member</option>
          </select>
        </div>

        <div>
          <input type="submit" value="Add User" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
