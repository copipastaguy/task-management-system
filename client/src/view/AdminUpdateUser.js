import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

const AdminUpdateUser = () => {
  // array of usernames fetched

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setGroupOptions(data);
    };
    getGroups();

    const getUsers = async () => {
      const response = await axios.get("/accounts");
      const data = response.data;
      setUsers(data);
    };
    getUsers();
  }, []);

  /////////////////////  USERS /////////////////////////////
  // REACT SELECT USER
  // data to be sent
  const [username, setUsername] = useState();
  // fetch array state
  const [users, setUsers] = useState([]);
  // selected option
  const [selectedUser, setSelectedUser] = useState();
  const handleUsername = (selectedUser) => {
    const value = selectedUser.value;
    setUsername(value);
    console.log(username);
  };

  const userOptions = users.map((user) => {
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

  const handleActive = (selectedActive) => {
    const value = selectedActive.value;
    setActive(value);
  };

  const activeOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  /////////////////////  USER GROUP /////////////////////////////
  // REACT SELECT GROUP
  // data to be sent in
  const [userGroup, setUserGroup] = useState([]);
  // user selection
  const [selectedOption, setSelectedOption] = useState();
  // fetch array state
  const [groupOptions, setGroupOptions] = useState([]);

  const handleUserGroup = (selectedOption) => {
    setSelectedOption(selectedOption);

    // access value from option and push to array
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };
  console.log(userGroup);

  // map out reactselect options
  const groups = groupOptions.map((option) => {
    // object for react-select options
    return { value: option.groupname, label: option.groupname };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      const response = await axios.put("/admin-update-user", {
        username,
        password,
        email,
        userGroup,
        active,
      });
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
      // RESET FIELDS
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
            // defaultValue={activeOptions[0]}
            value={selectedActive}
            onChange={handleActive}
            options={activeOptions}
          />
        </Form.Group>

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>User Group</Form.Label>
          <CreatableSelect
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
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
