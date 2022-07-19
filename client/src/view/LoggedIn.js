import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddGroup from "./AddGroup";
import AddUserToGroup from "./AddUserToGroup";
import RemoveUserFromGroup from "./RemoveUserFromGroup";

import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
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
    <div className="login-header">
      <h5>
        Welcome: <span>{user}</span>
      </h5>

      <Form.Group>
        <Button href="/" className="signOut-button" onClick={handleSignout}>
          Sign Out
        </Button>

        <Button href="/" className="signOut-button" onClick={handleCreateGroup}>
          Create Group
        </Button>

        <Button
          href="/"
          className="signOut-button"
          onClick={handleAddUserToGroup}
        >
          Add user to group
        </Button>

        <Button
          href="/"
          className="signOut-button"
          onClick={handleRemoveFromGroup}
        >
          Remove user from group
        </Button>
      </Form.Group>

      {showAddGroup && (
        <>
          <AddGroup />
          <Button
            className="closeBtn btn-danger"
            onClick={() => setAddGroup(!showAddGroup)}
          >
            Close
          </Button>
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
    </div>
  );
};

export default LoggedIn;
