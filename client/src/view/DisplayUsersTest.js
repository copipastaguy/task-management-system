import axios from "axios";
import React, { useEffect, useState } from "react";

import CreatableSelect from "react-select/creatable";

// MATERIAL UI
import { ToastContainer, toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";
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
  // state to store database after FETCH
  //  user rows
  const [users, setUsers] = useState([]);

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

  // // map out reactselect options
  const options = userOptions.map((option) => {
    // object for react-select options
    return { value: option.user_group, label: option.user_group };
  });

  console.log("options", options);

  // render options for material table
  const RenderOption = ({ row }) => {
    // console.log(userOptions);
    const [userGroup, setUserGroup] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    // format usergroup to array
    const handleUserGroup = (selectedOption) => {
      setUserGroup([...userGroup, selectedOption]);

      // what user has selected. != option that is removed
      console.log("selected", selectedOption);

      // access value from option and push to array
      selectedOption.forEach((option) => {
        const value = option.value;

        // updated groups
        setUserGroup([...userGroup, value]);
        console.log(userGroup);
      });
    };

    // const groupArray = users.user_group.split(",");
    // // user groups user exist in
    // const currentGroup = groupArray.map((group) => {
    //   return {
    //     value: group.trim(),
    //     label: group.trim(),
    //   };
    // });

    return (
      <CreatableSelect
        // defaultValue={currentGroup}
        isMulti={true}
        // value={selectedOption}
        onChange={handleUserGroup}
        options={options}
        // isDisabled={isDisabled}
      />
    );
  };

  // render columns for material table
  const columns = [
    {
      headerName: "ID",
      field: "id",
      width: 50,
    },
    {
      headerName: "Username",
      field: "username",
      width: 300,
    },
    {
      title: "Password",
      field: "password",
      width: 200,
    },
    {
      headerName: "Email",
      field: "email",
      width: 200,
      editable: true,
    },
    {
      headerName: "Disabled",
      field: "disabled",
      editable: true,
    },
    {
      title: "User group",
      field: "usergroup",
      width: 300,
      renderCell: () => <RenderOption />,
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const ReadTable = ({ user }) => {
    return (
      <TableBody>
        <TableRow key={user.username}>
          {/* <TableCell>{user.id}</TableCell> */}
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.isEnabled}</TableCell>
          <TableCell style={{ width: "400px" }}>
            <RenderOption />
          </TableCell>

          <TableCell>
            <button>Edit User</button>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  const EditTable = ({ user }) => {
    return (
      <TableBody>
        <TableRow key={user.username}>
          <TableCell>
            <Input placeholder={user.email} />
          </TableCell>
          <TableCell>
            <Input placeholder={user.isEnabled} />
          </TableCell>
          <TableCell>
            <Input placeholder={user.user_group} />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  return (
    <div className=" main-container ">
      <div style={{ height: "50vh", width: "95%" }}>
        {/* <RenderOption /> */}
        <Table>
          <TableHead>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>User Group</TableCell>
            <TableCell>Edit</TableCell>
          </TableHead>
          {users.map((user) => {
            return (
              <>
                <EditTable user={user} />
                <ReadTable user={user} />
              </>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export default DisplayUsers;
