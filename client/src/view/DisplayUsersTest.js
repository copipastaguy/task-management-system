import axios from "axios";
import React, { useEffect, useState } from "react";

import CreatableSelect, { useCreatable } from "react-select/creatable";

import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// MATERIAL UI
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from "@material-ui/core/Input";

const DisplayUsers = () => {
  // state to store database after FETCHs
  const [users, setUsers] = useState([]);
  const [userGroup, setUserGroup] = useState([]);

  // fetch existing user groups from table
  const [userOptions, setUserOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  const getUsers = async () => {
    try {
      const response = await axios.get("/accounts");
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getGroups = async () => {
    try {
      const response = await axios.get("/user-groups");
      setUserOptions(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    // load on render
    getUsers();
    getGroups();
  }, []);

  // console.log("options", options);

  // states for saving editing form
  const [editUser, setEditUser] = useState(null);

  // VALUES TO SEND IN PUT
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [active, setActive] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedActive, setSelectedActive] = useState("");

  // render options for material table
  // const RenderGroup = ({ user }) => {
  //   // console.log(user);

  //   // map out ALL reactselect options
  //   const options = userOptions.map((option) => {
  //     // object for react-select options
  //     return { value: option.user_group, label: option.user_group };
  //   });

  //   // format usergroup to array
  //   const handleUserGroup = (selectedOption) => {
  //     // setUserGroup(selectedGroup);
  //     // console.log(userGroup);
  //     // console.log(selectedGroup);

  //     // what user has selected. != option that is removed
  //     selectedOption.forEach((group) => {
  //       const value = group.value;
  //       setUserGroup([...userGroup, value]);
  //       // console.log(userGroup);
  //     });
  //   };

  //   const groupArray = user.user_group.split(",");

  //   // // user groups user exist in
  //   // const currentGroup = groupArray.map((group) => {
  //   //   return {
  //   //     value: group.trim(),
  //   //     label: group.trim(),
  //   //   };
  //   // });
  //   // console.log(currentGroup);
  //   return (
  //     <CreatableSelect
  //       // defaultValue={currentGroup}
  //       isMulti={true}
  //       value={selectedOption}
  //       // onChange={handleUserGroup}
  //       options={options}
  //       // isDisabled={isDisabled}
  //     />
  //   );
  // };

  // const RenderActive = ({ user }) => {
  //   // const [active, setActive] = useState();
  //   const [selectedActive, setSelectedActive] = useState();

  //   const activeOptions = [
  //     {
  //       label: "Active",
  //       value: "active",
  //     },
  //     {
  //       label: "Inactive",
  //       value: "inactive",
  //     },
  //   ];

  //   const handleActive = (selectedActive) => {
  //     const value = selectedActive.value;
  //     setActive(value);
  //   };
  //   // console.log(active);

  //   // get active status
  //   const currentActive = user.isActive;
  //   const activeObj = {
  //     label: currentActive,
  //     value: currentActive,
  //   };

  //   return (
  //     <CreatableSelect
  //       defaultValue={activeObj}
  //       value={selectedActive}
  //       onChange={handleActive}
  //       options={activeOptions}
  //       // isDisabled={isDisabled}
  //     />
  //   );
  // };

  const ReadTable = ({ user, handleEditClick }) => {
    return (
      <TableRow key={user.username}>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.isActive}</TableCell>
        <TableCell style={{ width: "300px" }}>{user.user_group}</TableCell>

        <TableCell>
          <Button variant="primary" onClick={(e) => handleEditClick(e, user)}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const [formValue, setFormValue] = useState();

  const EditTable = ({ user, handleEditChange }) => {
    const options = userOptions.map((option) => {
      // object for react-select options
      return { value: option.user_group, label: option.user_group };
    });

    const handleUserGroup = (selectedOption) => {
      // console.log(selectedOption);
      setSelectedOption(selectedOption);

      // access value from option and push to array
      selectedOption.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });
    };

    const groupArray = user.user_group.split(",");
    // user groups user exist in
    const currentGroup = groupArray.map((group) => {
      return {
        value: group.trim(),
        label: group.trim(),
      };
    });

    const activeOptions = [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
    ];

    const handleActive = (selectedActive) => {
      console.log(selectedActive);
      setSelectedActive(selectedActive);

      const value = selectedActive.value;
      setActive(value);
    };

    // get active status
    const currentActive = user.isActive;
    const currentActiveObj = {
      label: currentActive,
      value: currentActive,
    };

    return (
      <TableRow>
        <TableCell>{user.username}</TableCell>
        <TableCell>
          <Input
            name="email"
            placeholder={user.email}
            // value={email}
            onChange={handleEditChange}
          />
        </TableCell>
        <TableCell>
          <CreatableSelect
            defaultValue={currentActiveObj}
            value={selectedActive}
            onChange={handleActive}
            options={activeOptions}
          />
        </TableCell>
        <TableCell>
          <CreatableSelect
            defaultValue={currentGroup}
            isMulti={true}
            value={selectedOption}
            onChange={handleUserGroup}
            options={options}
          />
        </TableCell>

        <TableCell>
          <Button type="submit">Save</Button>
        </TableCell>
      </TableRow>
    );
  };

  const handleEditClick = (e, user) => {
    e.preventDefault();
    setEditUser(user.username);
    console.log(user.username);
  };

  const handleEditChange = (e) => {
    e.preventDefault();

    email = setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className=" main-container ">
      <div style={{ height: "50vh", width: "95%" }}>
        <Form onSubmit={handleSubmit}>
          <Table className="user-table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User Group</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>

            {users.map((user) => {
              return (
                <TableBody key={user.username}>
                  {editUser === user.username ? (
                    <EditTable user={user} handleSubmit={handleSubmit} />
                  ) : (
                    <ReadTable user={user} handleEditClick={handleEditClick} />
                  )}
                </TableBody>
              );
            })}
          </Table>
        </Form>
      </div>
    </div>
  );
};

export default DisplayUsers;
