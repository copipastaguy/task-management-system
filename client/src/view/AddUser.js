import React, { useState } from "react";

const AddUser = () => {
  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch POST statement to add new user to database with form data
      // await Axios.post (backend url, {data to be sent username, password, email, group})
      console.log("added user");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h2>Add a new user</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newUsername">
            <p>username</p>
          </label>
          <input
            type="text"
            name="newUsername"
            placeholder="Username"
            id="newUsername"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            <p>password</p>
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Password"
            id="newPassword"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="newEmail">
            <p>email</p>
          </label>
          <input
            type="email"
            name="newEmail"
            placeholder="Email"
            id="newEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newGroup">
            <p>user group</p>
          </label>
          <input
            type="text"
            name="newGroup"
            placeholder="User Group"
            id="newGroup"
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Add User" />
        </div>
      </form>
    </>
  );
};

export default AddUser;
