import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateUser = () => {
  //   update user fields

  // array of usernames fetched
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState();
  const [group, setGroup] = useState("");
  const [enable, setEnable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      await axios.post("/update-user", {
        username,
        password,
        email,
        role,
        enable,
      });

      // RESET FIELDS
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className="login-form form">
        <h3>UPDATE USER</h3>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <Form.Text>Enter account username</Form.Text> */}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Form.Text muted>
            Your password must be 8-20 characters long
          </Form.Text> */}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Group</Form.Label>
          <Form.Control
            type="text"
            placeholder="group"
            value={group}
            id="group"
            onChange={(e) => setGroup(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          {/* <Form.Label>Role</Form.Label> */}
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Choose a role</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add user
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
