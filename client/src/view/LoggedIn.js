import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const navigate = useNavigate();
  const local_user = sessionStorage.getItem("username");

  const handleSignout = (e) => {
    e.preventDefault();

    // CLEAR ALL STORAGE
    sessionStorage.clear("username");
    sessionStorage.clear("username");
    navigate("/");
  };

  const goHome = (e) => {
    e.preventDefault();
    navigate("/management");
  };

  const groupManagemant = (e) => {
    e.preventDefault();
    navigate("/group-management");
  };

  return (
    <div className="login-header nav-bar">
      <h4>
        Welcome: <span>{local_user}</span>
      </h4>

      <Form>
        <Button onClick={goHome}>Home</Button>
        <Button onClick={groupManagemant}>Group Management</Button>
        <Button className="signOut-btn btn-danger" onClick={handleSignout}>
          Sign Out
        </Button>
      </Form>
    </div>
  );
};

export default LoggedIn;
