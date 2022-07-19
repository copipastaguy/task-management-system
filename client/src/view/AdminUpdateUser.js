import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from "react-toastify";

const AdminUpdateUser = () => {
  // array of usernames fetched
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [enable, setEnable] = useState("");

  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [userOptions, setUserOptions] = useState([]);

  const [active, setActive] = useState("");
  const [selectedActive, setSelectedActive] = useState();

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setUserOptions(data);
    };
    getGroups();
  }, []);

  const activeOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const handleUserGroup = (selectedOption) => {
    setUserGroup(selectedOption);

    // access value from option and push to array
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };

  const handleActive = (selectedActive) => {
    const value = selectedActive.value;
    setActive(value);
  };

  // map out reactselect options
  const options = userOptions.map((option) => {
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
        setUsername("");
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

      <Form className="add-form form" onSubmit={handleSubmit}>
        <h3>UPDATE USER</h3>
        <Form.Group>
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            // required
            type="password"
            // placeholder="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            // placeholder="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>

          <CreatableSelect
            defaultValue="Active"
            value={selectedActive}
            onChange={handleActive}
            options={activeOptions}
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

        <Button className="submitButton" variant="success" type="submit">
          Save user
        </Button>
      </Form>
    </div>
  );
};

export default AdminUpdateUser;
