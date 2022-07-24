import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import useApi from "../utils/useApi";

const AdminUpdateUser = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const getGroups = async () => axios.get("/user-groups");
  const getGroupsApi = useApi(getGroups);

  const getUsers = async () => axios.get("/accounts");
  const getUsersApi = useApi(getUsers);

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    getGroupsApi.request();
    getUsersApi.request();
  }, []);

  /////////////////////  USERS /////////////////////////////
  const [username, setUsername] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const handleUsername = (selectedUser) => {
    const value = selectedUser.value;
    setUsername(value);
    console.log(username);
  };
  const userOptions = getUsersApi.data?.map((user) => {
    const value = user.username;
    return {
      label: value,
      value: value,
    };
  });
  /////////////////////  ACTIVE STATUS  /////////////////////////////
  // REACT SELECT ACTIVE
  const [active, setActive] = useState("");
  const [selectedActive, setSelectedActive] = useState();

  const activeOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  /////////////////////  USER GROUP /////////////////////////////
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const groups = getGroupsApi.data?.map((option) => {
    return { value: option.groupname, label: option.groupname };
  });

  const updateUser = () =>
    axios.put("/admin-update-user", {
      username,
      password,
      email,
      userGroup,
      active,
    });
  const updateUserApi = useApi(updateUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setActive(selectedActive);
      setSelectedOption(selectedOption);
      selectedGroup.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });

      const response = updateUserApi.request();
      console.log(response.data);
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      if (!response.data.error) {
        setSelectedUser(null);
        setPassword("");
        setEmail("");
        setSelectedOption(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="main-container">
      <ToastContainer />

      <Form className="form" onSubmit={handleSubmit}>
        <h3>UPDATE USER</h3>
        <Form.Group style={{ width: "400px" }}>
          <Form.Label>Username</Form.Label>
          <Select
            value={selectedUser}
            onChange={handleUsername}
            options={userOptions}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="new password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="new email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>Status</Form.Label>
          <Select
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
            options={groups}
          />
        </Form.Group>

        <Button className="submitButton" variant="success" type="submit">
          Save user
        </Button>
      </Form>
    </div>
  );
};

export default AdminUpdateUser;
