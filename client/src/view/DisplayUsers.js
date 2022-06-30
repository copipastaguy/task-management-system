import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState();

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    // load on render
    getUsers();
  }, []);

  // fetch GET statement for all users in database
  const getUsers = async () => {
    const response = await axios.get("/accounts");
    // store array in state
    setUsers(response.data);
    // console.log(response.data);
  };

  return (
    <div className="displayContainer">
      <button onClick={getUsers}>Refresh</button>
      {/* <form>
        <input type="text" placeholder="Search"></input>
        <input type="submit"></input>
      </form> */}
      <h2>Display Users</h2>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Group</th>
              <th>Enabled</th>
            </tr>
          </thead>

          {users?.map((user) => {
            return (
              <tbody key={user.username}>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.user_group}</td>
                  <td>
                    {user.isEnabled === "False" ? (
                      <input type="checkbox" value="false" />
                    ) : (
                      <input type="checkbox" value="true" defaultChecked />
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default DisplayUsers;
