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
    // console.log(response.data);
    // store array in state

    // const userObj = [];
    // response.data.map((row) => {
    //   if (!userObj[row.username]) {
    //     userObj[row.username] = [row.email];
    //   }
    //   userObj[row.username].push(row.user_group);
    //   setUsers(userObj);
    // });
    // console.log(userObj);

    // let userObj = {
    //   username: "",
    //   usergroup: [],
    // };
    // response.data.map((row) => {
    //   userObj.username = row.username;
    //   userObj.usergroup.push(row.user_group);
    // });
    // console.log(userObj);
  };

  return (
    <div className=" main-container ">
      {/* <button onClick={getUsers}>Refresh</button> */}

      <div className="user-table ">
        <form>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User Group</th>
                <th>Enabled</th>
              </tr>
            </thead>

            {users?.map((user) => {
              return (
                <tbody key={`${user.username}`}>
                  <td>{user.username}</td>
                  {/* <tr>
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
                  </tr> */}
                </tbody>
              );
            })}
          </table>
        </form>
      </div>
    </div>
  );
};

export default DisplayUsers;
