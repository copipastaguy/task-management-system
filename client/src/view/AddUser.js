import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";
import CreatableSelect, { useCreatable } from "react-select/creatable";

const AddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  // fetch existing user groups from table
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setUserOptions(data);
    };
    getGroups();
  }, []);

  const options = userOptions.map((option) => {
    // object for react-select options
    return { value: option.user_group, label: option.user_group };
  });

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

    // POST request for user database
    try {
      const response = await axios.post("/add", {
        username,
        password,
        email,
        userGroup,
      });
      // console.log(response);

      // FRONTEND ERROR HANDLING
      if (response.data.error) {
        // invalid field
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      if (!response.data.error) {
        // no errors
        // reset form field
        setUsername("");
        setPassword("");
        setEmail("");
        setUserGroup([]);
        toast.success("New user successfully added", {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/management");
  };

  return (
    <div className="main-container">
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

          <CreatableSelect
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
            options={options}
          />
        </Form.Group>

        <Button className="submitButton" variant="primary" type="submit">
          Add user
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
