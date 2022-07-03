import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const LoggedIn = () => {
  const user = localStorage.getItem("username");
  return (
    <div className="login-header">
      {/* <NavBar /> */}
      {/* <Form className="login-form"> */}
      <h5>
        Welcome: <span>{user}</span>
      </h5>

      <Form.Group>
        <Button href="/" className="signOut-button">
          Sign Out
        </Button>
      </Form.Group>
      {/* </Form> */}
    </div>
  );
};

export default LoggedIn;
