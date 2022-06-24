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
    <>
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UpdatePassword">
            <p>new password</p>
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
            <p>new email</p>
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
            <p>user group</p>
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
    </>
  );
};

export default UpdateUser;
