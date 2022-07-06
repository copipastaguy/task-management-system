import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";
// import { MultiSelect } from "react-multi-select-component";

const AddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userGroup, setUserGroup] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/add", {
        username,
        password,
        email,
        userGroup,
      });
      console.log(response);

      // FRONTEND ERROR HANDLING
      if (response.data.error) {
        // invalid field
        console.log(response.data.error);
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else {
        // no errors
        // reset form field
        setUsername("");
        setPassword("");
        setEmail("");
        // setUserGroup();

        toast.success("New user successfully added");
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/management");
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleSubmit} className="login-form form">
        <h3>ADD USER</h3>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            // required
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
            // required
            type="text"
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
            // required
            type="text"
            placeholder="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>User Group</Form.Label>
          <Form.Select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value)}
          >
            <option>Choose a role</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Project Lead">Project Lead</option>
            <option value="Team Member">Team Member</option>
          </Form.Select>
          {userGroup}

          {/* <Form.Check
            type="checkbox"
            label="Project Manager"
            value="Project Manager"
          />
          <Form.Check
            type="checkbox"
            label="Project Lead"
            value="Project Lead"
          />
          <Form.Check
            type="checkbox"
            label="Team Member"
            value="Team Member"
          /> */}
        </Form.Group>

        <Button className="submitButton" variant="primary" type="submit">
          Add user
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
