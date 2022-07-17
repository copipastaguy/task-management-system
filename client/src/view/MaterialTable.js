import axios from "axios";
import React, { useEffect, useState } from "react";

import CreatableSelect, { useCreatable } from "react-select/creatable";

import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import MaterialTable from "material-table";
import TableIcons from "./TableIcons";

// MATERIAL UI
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
    console.log(users);
    getGroups();
  }, []);

  const handleRowAdd = async (newRow, resolve) => {
    try {
      const updatedRows = [...users, newRow];
      const response = await axios.post("/add", {
        username: newRow.username,
        password: newRow.password,
      });
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      resolve();
      console.log(response);
      // setTimeout(() => {
      //   // set new state of data
      //   setUsers(updatedRows);
      //   resolve();
      //   console.log(newRow);
      // }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  // console.log("options", options);

  // states for saving editing form
  const [editUser, setEditUser] = useState(null);

  // VALUES TO SEND IN PUT
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [active, setActive] = useState();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedActive, setSelectedActive] = useState("");

  const RenderActive = (isActive) => {
    //   console.log(rows);
    //   const [selectedActive, setSelectedActive] = useState();

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
      const value = selectedActive.value;
      setActive(value);
      console.log(selectedActive);
    };

    // get active status
    // const currentActive = rowData.isActive;
    // const activeObj = {
    //   label: currentActive,
    //   value: currentActive,
    // };

    return (
      <CreatableSelect
        // defaultValue={activeObj}
        value={selectedActive}
        onChange={handleActive}
        options={activeOptions}
        // isDisabled={isDisabled}
      />
    );
  };

  const columns = [
    {
      field: "timestamp",
      title: "Created/ Updated",
    },
    {
      field: "username",
      title: "Username",
    },
    {
      field: "password",
      title: "password",
      // render a custom react element
      render: (rowData) => <p>********</p>,
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "isActive",
      title: "Status",
    },
    {
      field: "user_group",
      title: "User Group",
    },
  ];

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

  const handleUpdate = (updatedRow, oldRow) => {};

  return (
    <div className=" main-container ">
      <div style={{ height: "50vh", width: "95%" }}>
        <ToastContainer />
        <MaterialTable
          title="User Database"
          columns={columns}
          data={users}
          icons={TableIcons}
          editable={{
            // onRowAdd: (newRow) =>
            //   new Promise((resolve, reject) => {
            //     handleRowAdd(newRow, resolve);
            //   }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve) => {
                // get specific row id
                const rowId = oldRow.tableData.id;
                const updatedRows = [...users];
                updatedRow[rowId] = updatedRow;
                setTimeout(() => {
                  // set new state of data
                  setUsers(updatedRows);
                  resolve();
                  console.log(oldRow);
                }, 1000);
              }),
          }}
          options={{
            pageSize: 10,
            // emptyRowsWhenPaging: false,
            addRowPosition: "first",
            actionsColumnIndex: -1,
          }}
          // actions={[
          //   {
          //     icon: "Edit",
          //     tooltip: "edit",
          //     isFreeAction: true,
          //     onClick: (event, rowData) => alert("add new user"),
          //   },
          // ]}
          // components={{
          //   Cell: (props) => <Button>hi</Button>,
          // }}
        />
      </div>
    </div>
  );
};

export default DisplayUsers;
