import { useState } from "react";
import Header from "./Header";
import AddUser from "./AddUser";
import AdminUpdateUser from "./AdminUpdateUser";
// import DisplayUsers from "./DisplayUsers";
// import DisplayUsersTest from "./DisplayUsersTest";
import LoggedIn from "./LoggedIn";
import MaterialTable from "./MaterialTable";

import Button from "react-bootstrap/Button";

const UserManagement = () => {
  const [actions, setActions] = useState("view");

  const [displayAdd, setDisplayAdd] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  return (
    <div className="main-container">
      <LoggedIn />
      {/* <h3>User Management</h3> */}
      <div className="manage">
        <div className="actions_menu">
          <p>What would you like to do today?</p>
          <Button
            className="action-btn"
            onClick={() => setDisplayAdd(!displayAdd)}
          >
            Add user
          </Button>
          <Button
            className="action-btn"
            onClick={() => setDisplayUpdate(!displayUpdate)}
          >
            Update user
          </Button>

          {/* <Form.Select onChange={(e) => setActions(e.target.value)}>
            <option value="add">Add user</option>
            <option value="update">Update user</option>
            <option value="enable">Enable/Disable user</option>
            <option value="view">View all users</option>
          </Form.Select> */}
        </div>

        {/* {actions === "add" && <AddUser />}
        {actions === "update" && <UpdateUser />} */}
        {actions === "view" && <MaterialTable />}
        {displayAdd && (
          <>
            <AddUser />
            <Button
              className="closeBtn btn-danger"
              onClick={() => setDisplayAdd(!displayAdd)}
            >
              Close
            </Button>
          </>
        )}

        {displayUpdate && (
          <>
            <AdminUpdateUser />
            <Button
              className="closeBtn btn-danger"
              onClick={() => setDisplayUpdate(!displayUpdate)}
            >
              Close
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
