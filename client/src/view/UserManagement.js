import { useState } from "react";
import Header from "./Header";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import DisplayUsers from "./DisplayUsers";

const UserManagement = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);

  // const actions = [
  //   "Add User",
  //   "Update account information",
  //   "Enable/Disable accounts",
  // ];

  return (
    <div className="container">
      <Header />
      <h1>User Management</h1>
      <div className="manage">
        <div className="actions_menu">
          <h2
            onClick={() => {
              setShowAdd(true);
              setShowUpdate(false);
              setShowDisable(false);
            }}
          >
            Add User
          </h2>
          <h2
            onClick={() => {
              setShowAdd(false);
              setShowUpdate(true);
              setShowDisable(false);
            }}
          >
            Update account information
          </h2>
          <h2
            onClick={() => {
              setShowAdd(false);
              setShowUpdate(false);
              setShowDisable(true);
            }}
          >
            Enable/Disable accounts
          </h2>
        </div>

        {showAdd && <AddUser />}
        {/* display if admin */}
        {showUpdate && <UpdateUser />}

        {/* display if user */}
        {/* <UpdateUser /> */}
        {/* <DisplayUsers /> */}
      </div>
    </div>
  );
};

export default UserManagement;
