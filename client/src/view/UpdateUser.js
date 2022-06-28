import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  //   update user fields
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  fetch POST statement to update user detail
      const response = await axios.post("/update-user", {
        password: "test",
        email: "test@123.com",
        // group: "admin",
      });
      console.log(response);
      console.log("updated");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Update Account</h2>
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
          <input
            type="text"
            name="updateGroup"
            placeholder="User Group"
            id="updateGroup"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Update Account" />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
