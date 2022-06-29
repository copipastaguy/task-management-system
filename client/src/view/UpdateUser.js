import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  //   update user fields

  // array of usernames fetched
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      await axios.post("/update-user", {
        username,
        password,
        email,
        group,
      });

      // RESET FIELDS
      setUsername("");
      setPassword("");
      setEmail("");
      setGroup("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Update Account</h2>

        <div>
          <label htmlFor="username">
            <p>user</p>
          </label>
          <input
            type="text"
            name="updateUsername"
            placeholder="username"
            id="updateUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="UpdatePassword">
            <p>password</p>
          </label>
          <input
            type="password"
            name="updatePassword"
            placeholder="Password"
            id="updatePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="updateEmail">
            <p>email</p>
          </label>
          <input
            type="email"
            name="updateEmail"
            placeholder="Email"
            id="updateEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="updateGroup">
            <p>group</p>
          </label>

          <select onChange={(e) => setGroup(e.target.value)}>
            <option value="select"></option>
            <option value="project_lead">Project Lead</option>
            <option value="project_manager">Project Manager</option>
            <option value="team_member">Team Member</option>
          </select>
        </div>

        <div>
          <input type="submit" value="Update Account" />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
