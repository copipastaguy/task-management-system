import { useState } from "react";
import Header from "./Header";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DisplayUsers from "./DisplayUsers";
import LoggedIn from "./LoggedIn";

import Form from "react-bootstrap/Form";

const UserManagement = () => {
  const [actions, setActions] = useState("add");

  return (
    <div className="main-container">
      <LoggedIn />
      {/* <h3>User Management</h3> */}
      <div className="manage">
        <div className="actions_menu">
          <p>What would you like to do today?</p>
          <Form.Select onChange={(e) => setActions(e.target.value)}>
            {/* <option>What would you like to do today?</option> */}
            <option value="add">Add user</option>
            <option value="update">Update user</option>
            <option value="enable">Enable/Disable user</option>
            <option value="view">View all users</option>
          </Form.Select>
        </div>

        {actions === "add" && <AddUser />}
        {actions === "update" && <UpdateUser />}
        {actions === "view" && <DisplayUsers />}
      </div>
    </div>
  );
};

export default UserManagement;
