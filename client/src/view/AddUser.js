import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, SetRole] = useState("");
  const [enable, setEnable] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("add");

    // POST request for user database
    try {
      const response = await axios.post("/add", {
        username,
        password,
        email,
        role,
      });
      console.log(response);

      // reset form field
      setUsername("");
      setPassword("");
      setEmail("");
      SetRole("");
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
    navigate("/management");
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <h2>Add user</h2>
        <div>
          <label htmlFor="username">
            <p>username</p>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            <p>password</p>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">
            <p>email</p>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="newGroup">
            <p>role</p>
          </label>

          <select value={role} onChange={(e) => SetRole(e.target.value)}>
            <option></option>
            <option value="Admin" selected>
              Admin
            </option>
            <option value="Project Lead">Project Lead</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Team Member">Team Member</option>
          </select>
        </div>

        <div>
          <input type="submit" value="Add User" />
        </div>
      </form> */}

      <Form onSubmit={handleSubmit} className="login-form form">
        <h3>ADD USER</h3>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          {/* <Form.Text>Your password must be 8-20 characters long</Form.Text> */}
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
          {/* <Form.Label>Role</Form.Label> */}
          <Form.Select value={role} onChange={(e) => SetRole(e.target.value)}>
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

export default AddUser;
