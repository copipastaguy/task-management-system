import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import useApi from "../utils/useApi";
import CreatableSelect, { useCreatable } from "react-select/creatable";

const AddUserToGroup = () => {
  const [username, setUsername] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const getGroups = async () => axios.get("/user-groups");
  const getGroupsApi = useApi(getGroups);
  useEffect(() => {
    getGroupsApi.request();
  }, []);

  const handleUserGroup = (selectedOption) => {
    console.log(selectedOption);
    setUserGroup(selectedOption);

    // access value from option and push to array
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };

  const groupOptions = getGroupsApi.data.map((group) => {
    return { value: group.groupname, label: group.groupname };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/remove-user-from-group", {
        username,
        userGroup,
      });
      console.log(response);
      if (!response.data.error) {
        toast.success(`Removed ${username} from ${userGroup}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setUsername("");
        setSelectedOption(null);
      }
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        setUsername("");
        setSelectedOption(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="main-container">
      <ToastContainer />

      <Form onSubmit={handleSubmit} className="add-form add-group form">
        <h3>REMOVE USER FROM GROUP</h3>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Control
            // required
            type="text"
            // placeholder="groupname"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>User group name</Form.Label>

          <CreatableSelect
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
            options={groupOptions}
          />
        </Form.Group>

        <Button className="submitButton" variant="success" type="submit">
          Remove user from group
        </Button>
      </Form>
    </div>
  );
};

export default AddUserToGroup;
