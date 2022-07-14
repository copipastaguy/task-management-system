import axios from "axios";
import React, { useEffect, useState } from "react";

// BOOTSTRAP
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CreatableSelect from "react-select/creatable";

// MATERIAL UI
import TableIcons from "./TableIcons";
import MaterialTable from "@material-table/core";
import Modal from "@material-ui/core/Modal";

import { ToastContainer, toast } from "react-toastify";

const DisplayUsers = () => {
  // state to store database after FETCH
  const [users, setUsers] = useState([]);

  // fetch existing user groups from table
  const [userOptions, setUserOptions] = useState([]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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

  // render options for material table
  const RenderOption = (rowData) => {
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

    const groupArray = rowData.user_group.split(",");
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
        isDisabled={isDisabled}
      />
    );
  };

  const RenderModal = (rowData) => {
    const [username, setUsername] = useState(rowData.username);
    const [email, setEmail] = useState(rowData.email);
    const [password, setPassword] = useState(rowData.password);

    const [userGroup, setUserGroup] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    const handleUserGroup = (selectedOption) => {
      console.log(selectedOption);
      setUserGroup(selectedOption);

      // access value from option and push to array
      selectedOption.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });
    };

    // const options = userOptions.map((option) => {
    //   // object for react-select options
    //   return { value: option.user_group, label: option.user_group };
    // });

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(username, email);
      try {
        const response = await axios.put("/update-user", {
          username,
          password,
          email,
          userGroup,
        });
        // console.log(response);
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        {/* <button onClick={(rowData) => setOpenModal(true)}>edit</button> */}
        <ToastContainer />
        <Modal open={openModal} onClose={closeModal}>
          <div className="modal-container">
            <Form className="login-form form" onSubmit={handleSubmit}>
              <Form.Label>Edit: {username}</Form.Label>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  // value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
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
      </>
    );
  };

  // render columns for material table
  const columns = [
    {
      title: "username",
      field: "username",
      width: "200px",
    },
    {
      title: "password",
      field: "password",
      width: "200px",
      render: () => <p>********</p>,
    },
    {
      title: "email",
      field: "email",
      width: "250px",
    },
    {
      title: "user group",
      field: "usergroup",
      width: "350px",
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
    {
      title: "edit",
      field: "edit",
      render: (rowData) => {
        // const RenderModal = () => {
        //   const [username, setUsername] = useState(rowData.username);
        //   const [email, setEmail] = useState(rowData.email);
        //   const [password, setPassword] = useState(rowData.password);
        //   const [userGroup, setUserGroup] = useState([]);
        //   const [selectedOption, setSelectedOption] = useState();
        //   const handleUserGroup = (selectedOption) => {
        //     console.log(selectedOption);
        //     setUserGroup(selectedOption);
        //     // access value from option and push to array
        //     selectedOption.forEach((option) => {
        //       const value = option.value;
        //       setUserGroup([...userGroup, value]);
        //     });
        //   };
        //   const handleSubmit = async (e) => {
        //     e.preventDefault();
        //     console.log(username, email);
        //     try {
        //       const response = await axios.put("/update-user", {
        //         username,
        //         password,
        //         email,
        //         userGroup,
        //       });
        //       if (response.data.error) {
        //         toast.error(response.data.error, {
        //           position: "top-center",
        //           autoClose: 700,
        //           hideProgressBar: false,
        //           closeOnClick: true,
        //           pauseOnHover: true,
        //         });
        //       }
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };
        return (
          <>
            <button
              onClick={() => {
                setOpenModal(true);
                console.log(rowData);
                console.log(openModal);
              }}
            >
              Edit
            </button>
            {openModal && <RenderModal />}
            {/* <ToastContainer />
            <Modal open={openModal} onClose={closeModal}>
              <div className="modal-container">
                <Form className="login-form form" onSubmit={handleSubmit}>
                  <Form.Label>Edit: {rowData.username}</Form.Label>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      // value={password}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={rowData.email}
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
                  <Button
                    className="submitButton"
                    variant="primary"
                    type="submit"
                  >
                    Save user
                  </Button>
                </Form>
              </div>
            </Modal> */}
          </>
        );
        // };
      },
    },
  ];

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className=" main-container ">
      <MaterialTable
        title="User Data"
        columns={columns}
        data={users}
        icons={TableIcons}
        // detailPanel={[
        //   {
        //     tooltip: "Show Name",
        //     render: ({ rowData }) => {
        //       return (
        //         <button onClick={() => console.log(rowData.email)}>hi</button>
        //       );
        //     },
        //   },
        // ]}
        // onRowClick={(event, rowData, togglePanel) => togglePanel()}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default DisplayUsers;
