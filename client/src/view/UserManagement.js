import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CreatableSelect, { useCreatable } from "react-select/creatable";
import Select from "react-select";
import axios from "axios";
import useApi from "../utils/useApi";

import LoggedIn from "./LoggedIn";
import MaterialTable from "./MaterialTable";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";

const UserManagement = () => {
  const getGroups = async () => axios.get("/user-groups");
  const getGroupsApi = useApi(getGroups);

  useEffect(() => {
    getGroupsApi.request();
  }, []);

  const options = getGroupsApi.data?.map((option) => {
    return {
      label: option.groupname,
      value: option.groupname,
    };
  });

  const activeOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const AddUser = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [active, setActive] = useState("");
    const [userGroup, setUserGroup] = useState([]);

    const [selectedOption, setSelectedOption] = useState();
    const [selectedActive, setSelectedActive] = useState();

    const handleUserGroup = (selectedOption) => {
      setSelectedOption(selectedOption);

      // access value from option and push to array
      selectedOption.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });
      console.log(userGroup);
    };

    const handleActive = (selectedActive) => {
      const value = selectedActive.value;
      setActive(value);
    };

    // const addUser = () =>
    //   axios.post("/add", { username, password, email, active, userGroup });
    // const addUserApi = useApi(addUser);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // addUserApi.request();
        const response = await axios.post("/add", {
          username,
          password,
          email,
          active,
          userGroup,
        });
        // FRONTEND ERROR HANDLING
        if (response.data.error) {
          // invalid field
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
        if (!response.data.error) {
          // no errors
          // reset form field
          setUsername("");
          setPassword("");
          setEmail("");
          // setSelectedOption();

          toast.success("New user successfully added", {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
      navigate("/management");
    };
    return (
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Form onSubmit={handleSubmit} className="add-form form">
          <h3>Create a new user</h3>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              // required
              type="password"
              placeholder="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Status</Form.Label>
            <Select
              defaultValue={activeOptions[0]}
              value={selectedActive}
              onChange={handleActive}
              options={activeOptions}
            />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>User Group</Form.Label>
            <CreatableSelect
              isMulti={true}
              value={selectedOption}
              onChange={handleUserGroup}
              options={options}
            />
          </Form.Group>

          <Form.Group>
            <Button className="submitButton" variant="success" type="submit">
              Add user
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    );
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const UpdateUser = ({ open, handleClose }) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
    useEffect(() => {
      const getGroups = async () => {
        const response = await axios.get("/user-groups");
        const data = response.data;
        setGroupOptions(data);
      };
      getGroups();

      const getUsers = async () => {
        const response = await axios.get("/accounts");
        const data = response.data;
        setUsers(data);
      };
      getUsers();
    }, []);

    /////////////////////  USERS /////////////////////////////
    // REACT SELECT USER
    // data to be sent
    const [username, setUsername] = useState();
    // fetch array state
    const [users, setUsers] = useState([]);
    // selected option
    const [selectedUser, setSelectedUser] = useState();
    const handleUsername = (selectedUser) => {
      const value = selectedUser.value;
      setUsername(value);
      console.log(username);
    };

    const userOptions = users.map((user) => {
      const value = user.username;
      return {
        label: value,
        value: value,
      };
    });

    /////////////////////  ACTIVE STATUS  /////////////////////////////
    // REACT SELECT ACTIVE
    const [active, setActive] = useState("");
    const [selectedActive, setSelectedActive] = useState();

    const handleActive = (selectedActive) => {
      const value = selectedActive.value;
      setActive(value);
    };

    const activeOptions = [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ];

    /////////////////////  USER GROUP /////////////////////////////
    // REACT SELECT GROUP
    // data to be sent in
    const [userGroup, setUserGroup] = useState([]);
    // user selection
    const [selectedOption, setSelectedOption] = useState();
    // fetch array state
    const [groupOptions, setGroupOptions] = useState([]);

    const handleUserGroup = (selectedOption) => {
      setSelectedOption(selectedOption);

      // access value from option and push to array
      selectedOption.forEach((option) => {
        const value = option.value;
        setUserGroup([...userGroup, value]);
      });
    };

    // map out reactselect options
    const groups = groupOptions.map((option) => {
      // object for react-select options
      return { value: option.groupname, label: option.groupname };
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        //  POST request to update user detail
        const response = await axios.put("/admin-update-user", {
          username,
          password,
          email,
          userGroup,
          active,
        });
        console.log(response.data);
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        if (!response.data.error) {
          toast.success("User updated", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setSelectedUser(null);
          setPassword("");
          setEmail("");
          setSelectedOption(null);
        }
        // RESET FIELDS
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <Form className="add-form form" onSubmit={handleSubmit}>
          <h3>UPDATE USER</h3>
          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Username</Form.Label>
            <Select
              value={selectedUser}
              onChange={handleUsername}
              options={userOptions}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="new password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="new email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Status</Form.Label>
            <Select
              value={selectedActive}
              onChange={handleActive}
              options={activeOptions}
            />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>User Group</Form.Label>
            <CreatableSelect
              isMulti={true}
              value={selectedOption}
              onChange={handleUserGroup}
              options={options}
            />
          </Form.Group>

          <Button className="submitButton" variant="success" type="submit">
            Save user
          </Button>
        </Form>
      </Modal>
    );
  };
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  return (
    <div className="main-container">
      <LoggedIn />
      <ToastContainer />
      <div className="manage">
        <div className="actions_menu">
          <Button onClick={handleOpenAdd}>Add user</Button>
          <Button onClick={handleOpenUpdate}>Update user</Button>
        </div>
        <AddUser open={openAdd} handleClose={handleCloseAdd} />
        <UpdateUser open={openUpdate} handleClose={handleCloseUpdate} />
        <MaterialTable />
      </div>
    </div>
  );
};

export default UserManagement;
