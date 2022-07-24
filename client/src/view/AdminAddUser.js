import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApi from "../utils/useApi";

import { ToastContainer, toast } from "react-toastify";
import CreatableSelect, { useCreatable } from "react-select/creatable";
import Select from "react-select";

const AdminAddUser = () => {
  const navigate = useNavigate();

  // handle change in form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedActive, setSelectedActive] = useState();

  // fetch existing user groups from table
  // const [userOptions, setUserOptions] = useState([]);

  const getGroups = () => axios.get("/user-groups");
  const getGroupsApi = useApi(getGroups);

  const addUser = () =>
    axios.post("/add", {
      username,
      password,
      email,
      active,
      userGroup,
    });
  const addUserApi = useApi(addUser);

  useEffect(() => {
    getGroupsApi.request();
  }, []);

  const groupOptions = getGroupsApi.data.map((group) => {
    return { value: group.groupname, label: group.groupname };
  });

  const activeOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setActive(selectedActive);
      selectedGroup.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });

      const response = addUserApi.request();
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
      if (!response.data.error) {
        setUsername("");
        setPassword("");
        setEmail("");
        setSelectedOption(null);

        toast.success("New user successfully added", {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
      <Form onSubmit={handleSubmit} className="form">
        <h3>Create a new user</h3>
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

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>Status</Form.Label>
          <Select
            defaultValue={activeOptions[0]}
            value={selectedActive}
            onChange={setActive}
            options={activeOptions}
          />
        </Form.Group>

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>User Group</Form.Label>
          <CreatableSelect
            isMulti={true}
            value={selectedGroup}
            onChange={setUserGroup}
            options={groupOptions}
          />
        </Form.Group>

        <Form.Group>
          <Button className="submitButton" variant="success" type="submit">
            Add user
          </Button>
        </Form.Group>

        <Form.Group>
          <Button className="submitButton" variant="danger">
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AdminAddUser;
