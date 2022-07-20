import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const local_user = localStorage.getItem("username");
  const session_user = sessionStorage.getItem("username");

  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();

    // CLEAR ALL STORAGE
    localStorage.clear("username");
    sessionStorage.clear("username");
    navigate("/");
  };

  return (
    <div className="login-header nav-bar">
      <div className="nav-bar-welcome">
        <h3>
          Welcome: <span>{local_user}</span>
        </h3>
      </div>

      <Form>
        <Button href="/management">Home</Button>

        <Button href="/group-management">Group Management</Button>

        <Button className="signOut-btn btn-danger" onClick={handleSignout}>
          Sign Out
        </Button>
      </Form>
    </div>
  );
};

export default LoggedIn;
