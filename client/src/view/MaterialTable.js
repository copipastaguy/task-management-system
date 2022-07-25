import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from "../utils/useApi";

import MaterialTable from "material-table";
import TableIcons from "./TableIcons";

// MATERIAL UI
const DisplayUsers = () => {
  // const getUsers = () => axios.get("/accounts");
  // const getUsersApi = useApi(getUsers);

  const [data, setData] = useState([]);

  useEffect(() => {
    // getUsersApi.request();
    const getUsers = async () => {
      const response = await axios.get("/accounts");
      setData(response.data);
    };
    getUsers();
  }, []);
  // const users = getUsersApi.data;

  const columns = [
    {
      field: "timestamp",
      title: "Last Updated",
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
      hidden: true,
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
          data={data}
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
