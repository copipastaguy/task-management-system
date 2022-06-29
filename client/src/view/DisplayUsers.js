import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    const response = await axios.get("/accounts");

    // store array in state
    setUsers(response.data);
  };

  // fetch GET statement for all users in database
  return (
    <div className="displayContainer">
      <button onClick={getUsers}>Refresh</button>
      <h2>Display Users</h2>
      {/* map users */}
      <div className="user-table">
        <div className="user-heading">
          <h2>Username</h2>
          <h2>Email</h2>
          <h2>User Group</h2>
        </div>
        {users.map((user) => (
          <div className="user-info" key={user.id}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.user_group}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayUsers;
