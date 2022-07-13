import axios from "axios";
import React, { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CreatableSelect from "react-select/creatable";
import MaterialTable from "@material-table/core";
// import { ThemeProvider } from "@material-ui/core/styles";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState([]);

  // const [userGroup, setUserGroup] = useState([]);
  // const [selectedOption, setSelectedOption] = useState();

  // fetch existing user groups from table
  const [userOptions, setUserOptions] = useState([]);

  // render options for material table
  const RenderOption = (rowData) => {
    const [userGroup, setUserGroup] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    // format usergroup to array
    let groupArray = rowData.user_group.split(",");

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

        // groupArray = [value, ...userGroup];
        // console.log("usergroup", userGroup);
      });
    };

    // user groups user exist in
    const currentGroup = groupArray.map((group) => {
      return {
        value: group.trim(),
        label: group.trim(),
      };
    });

    return (
      <CreatableSelect
        defaultValue={currentGroup}
        isMulti={true}
        value={selectedOption}
        onChange={handleUserGroup}
        options={options}
      />
    );
  };

  // render columns for material table
  const columns = [
    {
      title: "username",
      field: "username",
    },
    {
      title: "email",
      field: "email",
    },
    {
      title: "user group",
      field: "usergroup",
      width: "300px",
      render: RenderOption,
    },
    {
      title: "status",
      field: "isEnabled",
      render: (rowData) => (
        <div className={rowData.isEnabled ? "inactive" : "active"}>
          {rowData.isEnabled ? " Inactive" : "Active"}
        </div>
      ),
    },
  ];

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

  // map out reactselect options
  const options = userOptions.map((option) => {
    // object for react-select options
    return { value: option.user_group, label: option.user_group };
  });

  // const handleUserGroup = (selectedOption) => {
  //   console.log(selectedOption);
  //   setUserGroup(selectedOption);

  //   // access value from option and push to array
  //   selectedOption.forEach((option) => {
  //     const value = option.value;
  //     setUserGroup([...userGroup, value]);
  //   });
  // };

  // const showUsers = users.map((user, index) => {
  //   const groups = user.user_group.split(",");

  //   const currentGroup = groups.map((group) => {
  //     return {
  //       value: group.trim(),
  //       label: group.trim(),
  //     };
  //   });

  //   return (
  //     <>
  //       <CreatableSelect
  //         defaultValue={currentGroup}
  //         isMulti={true}
  //         value={selectedOption}
  //         onChange={handleUserGroup}
  //         options={options}
  //       />

  //       <Button type="submit">Save</Button>
  //     </>
  //   );
  // });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   alert(userGroup);

  //   // POST
  //   try {
  //     await axios.post("/update-user", {
  //       // username,
  //       // password,
  //       // email,
  //       userGroup,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className=" main-container ">
      {/* <div className="user-table ">{showUsers}</div> */}
      <MaterialTable
        title="User Data"
        columns={columns}
        data={users}
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, rowData) =>
              alert("You saved " + rowData.user_group),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default DisplayUsers;
