import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState([]);

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    // load on render
    getUsers();
  }, []);

  // fetch GET statement for all users in database
  const getUsers = async () => {
    const response = await axios.get("/accounts");
    // store array in state
    console.log(response.data);
    setUsers(response.data);

    console.log(users);

    users.forEach((user) => {
      console.log(`user is in: ${user.user_group}`);
    });
  };

  return (
    <div className=" main-container ">
      {/* <button onClick={getUsers}>Refresh</button> */}

      <div className="user-table ">
        {/* <form>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User Group</th>
                <th>Enabled</th>
              </tr>
            </thead>

            {users.map((user) => {
              return (
                <tbody key={user.id}>
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
        </form> */}
      </div>
    </div>
  );
};

export default DisplayUsers;
