import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddUser from "./AddUser";
import CreateGroup from "./CreateGroup";
import AddUserToGroup from "./AddUserToGroup";
import RemoveUserFromGroup from "./RemoveUserFromGroup";

import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const user = localStorage.getItem("username");

  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();
    console.log("sign out");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const [showAddGroup, setAddGroup] = useState(false);
  const [showAddUser, setAddUser] = useState(false);
  const [showRemoveUser, setRemoveUser] = useState(false);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    setAddGroup(!showAddGroup);
  };

  const handleAddUserToGroup = (e) => {
    e.preventDefault();
    setAddUser(!showAddUser);
  };

  const handleRemoveFromGroup = (e) => {
    e.preventDefault();
    setRemoveUser(!showRemoveUser);
  };

  return (
    <>
      <div className="login-header nav-bar">
        <p className="nav-bar-welcome">
          Welcome: <span>{user} hi</span>
        </p>

        <Form>
          <Button className="nav-btn" onClick={handleCreateGroup}>
            Create Group
          </Button>

          <Button className="nav-btn" onClick={handleAddUserToGroup}>
            Add user to group
          </Button>

          <Button className="nav-btn" onClick={handleRemoveFromGroup}>
            Remove user from group
          </Button>

          <Button className="signOut-btn btn-danger" onClick={handleSignout}>
            Sign Out
          </Button>
        </Form>
      </div>

      {showAddGroup && (
        <>
          <CreateGroup />
          {/* <Button
            className="closeBtn btn-danger"
            onClick={() => setAddGroup(!showAddGroup)}
          >
            Close
          </Button> */}
        </>
      )}

      {showAddUser && (
        <>
          <AddUserToGroup />
          <Button
            className="closeBtn btn-danger"
            onClick={() => setAddUser(!showAddUser)}
          >
            Close
          </Button>
        </>
      )}

      {showRemoveUser && (
        <>
          <RemoveUserFromGroup />
          <Button
            className="closeBtn btn-danger"
            onClick={() => setRemoveUser(!showRemoveUser)}
          >
            Close
          </Button>
        </>
      )}
    </>
  );
};

export default LoggedIn;
