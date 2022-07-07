import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";

const UpdateUser = () => {
  //   update user fields

  // array of usernames fetched
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [enable, setEnable] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const UserOptions = [
    { value: "project manager", label: "Project Manager" },
    { value: "project lead", label: "Project Lead" },
    { value: "team member", label: "Team Member" },
  ];

  const handleUserGroup = (selectedOption) => {
    setUserGroup(selectedOption);

    // access value from option and push to array
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      await axios.post("/update-user", {
        username,
        password,
        email,
        userGroup,
        enable,
      });

      // RESET FIELDS
      setUsername("");
      setPassword("");
      setEmail("");
      setUserGroup("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="main-container">
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

        {/* <Form.Group>
          <Form.Label>Group</Form.Label>
          <Form.Control
            type="text"
            placeholder="group"
            value={group}
            id="group"
            onChange={(e) => setGroup(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <CreatableSelect
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
            options={UserOptions}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update user
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
