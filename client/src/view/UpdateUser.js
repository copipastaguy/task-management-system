import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import Modal from "@material-ui/core/Modal";

const UpdateUser = (openModal, closeModal) => {
  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -

  // array of usernames fetched
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [enable, setEnable] = useState("");

  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setUserOptions(data);
    };
    getGroups();
  }, []);

  const handleUserGroup = (selectedOption) => {
    setUserGroup(selectedOption);

    // access value from option and push to array
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };

  // map out reactselect options
  const options = userOptions.map((option) => {
    // object for react-select options
    return { value: option.user_group, label: option.user_group };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      await axios.post("/update-user", {
        username,
        password,
        // email,
        // userGroup,
        // enable,
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
      <Modal open={openModal} onClose={closeModal}>
        <div className="modal-container">
          <Form className="login-form form" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username (unable to change)</Form.Label>
              <Form.Control
                type="text"
                // placeholder="username"
                value={username}
                id="username"
                // onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                // required
                type="text"
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
              <Form.Label>User Group</Form.Label>
              <CreatableSelect
                isMulti={true}
                value={selectedOption}
                onChange={handleUserGroup}
                options={options}
              />
            </Form.Group>

            <Button className="submitButton" variant="primary" type="submit">
              Save user
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUser;
