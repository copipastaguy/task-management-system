import { useState } from "react";

import AddUser from "./AddUser";
import AdminUpdateUser from "./AdminUpdateUser";
import LoggedIn from "./LoggedIn";
import MaterialTable from "./MaterialTable";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserManagement = () => {
  const [actions, setActions] = useState("view");

  const [displayAdd, setDisplayAdd] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  return (
    <div className="main-container">
      <LoggedIn />
      <div className="manage">
        <div className="actions_menu">
          <p>What would you like to do today?</p>
          <div>
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
          </div>

          {/* <Form.Select onChange={(e) => setActions(e.target.value)}>
            <option value="add">Add user</option>
            <option value="update">Update user</option>
            <option value="enable">Enable/Disable user</option>
            <option value="view">View all users</option>
          </Form.Select> */}
        </div>

        <MaterialTable />

        {/* {actions === "add" && <AddUser />}
        {actions === "update" && <UpdateUser />} */}
        {/* {actions === "view" && <MaterialTable />} */}
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
