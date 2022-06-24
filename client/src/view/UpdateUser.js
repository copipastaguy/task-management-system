import React, { useState } from "react";

const UpdateUser = () => {
  //   update user fields
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateGroup, setUpdateGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //  fetch POST statement to update user detail
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
            value={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.value)}
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
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
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
            value={updateGroup}
            onChange={(e) => setUpdateGroup(e.target.value)}
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
