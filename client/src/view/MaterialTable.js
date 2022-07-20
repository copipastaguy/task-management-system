import axios from "axios";
import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import TableIcons from "./TableIcons";

// MATERIAL UI
const DisplayUsers = () => {
  // state to store database after FETCHs
  const [users, setUsers] = useState([]);

  // fetch existing user groups from table
  // const [userOptions, setUserOptions] = useState([]);

  // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
  const getUsers = async () => {
    try {
      const response = await axios.get("/accounts");
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  // const getGroups = async () => {
  //   try {
  //     const response = await axios.get("/user-groups");
  //     setUserOptions(response.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  useEffect(() => {
    // load on render
    getUsers();
    // getGroups();
  }, []);

  const columns = [
    {
      field: "timestamp",
      title: "Created/ Updated",
      type: "datetime",
      editable: "never",
      width: "200",
      defaultSort: "desc",
    },
    {
      field: "username",
      title: "Username",
      editable: "never",
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
      field: "status",
      title: "Status",
      // render: (rowData) => <p className="active">{rowData.status}</p>,
    },
    {
      field: "user_group",
      title: "User Group",
    },
  ];

  return (
    <div className=" main-container ">
      <div style={{ height: "100%", width: "100%" }}>
        <MaterialTable
          style={{ width: "100%" }}
          title="User Management"
          columns={columns}
          data={users}
          icons={TableIcons}
          options={{
            pageSize: 10,
            emptyRowsWhenPaging: false,
            addRowPosition: "first",
            actionsColumnIndex: -1,
          }}
        />
      </div>
    </div>
  );
};

export default DisplayUsers;
