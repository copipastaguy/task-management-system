import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CreatableSelect from "react-select/creatable";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState([]);

  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  // fetch existing user groups from table
  const [userOptions, setUserOptions] = useState([]);

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  useEffect(() => {
    // load on render
    const getUsers = async () => {
      const response = await axios.get("/accounts");
      return setUsers(response.data);
    };
    getUsers();

    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setUserOptions(data);
    };
    getGroups();
  }, []);

  const options = userOptions.map((option) => {
    // console.log(userOptions);
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
    alert(userGroup);

    // POST
    try {
      await axios.post("/update-user", {
        // username,
        // password,
        // email,
        userGroup,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showUsers = users.map((user, index) => {
    console.log(user.user_group);
    // const groups = user.user_group.split(",");

    // const currentGroup = groups.map((group) => {
    //   return {
    //     value: group.trim(),
    //     label: group.trim(),
    //   };
    // });

    return (
      <Form
        onSubmit={handleSubmit}
        key={user.username}
        className="form userTable"
      >
        <Form.Group>
          <Form.Label>username</Form.Label>
          <p>{user.username}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>email</Form.Label>
          <p>{user.email}</p>
        </Form.Group>

        <Form.Group>
          <Form.Label>user group</Form.Label>

          <CreatableSelect
            // defaultValue={currentGroup}
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
            options={options}
          />
        </Form.Group>

        <Button type="submit">Save</Button>
      </Form>
    );
  });

  return (
    <div className=" main-container ">
      <div className="user-table ">{showUsers}</div>
    </div>
  );
};

export default DisplayUsers;
