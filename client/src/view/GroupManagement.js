import { useState, useEffect } from "react";
import axios from "axios";

import LoggedIn from "./LoggedIn";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import CreatableSelect, { useCreatable } from "react-select/creatable";

const UserManagement = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const CreateModal = ({ open, handleClose }) => {
    const [groupname, setGroupName] = useState();
    const submitNewGroup = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post("/add-group", {
          groupname,
        });
        console.log(response);
        if (!response.data.error) {
          toast.success(`Added ${groupname} to user groups`, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setGroupName("");
        }
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setGroupName("");
        }
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <Modal
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={submitNewGroup} className="add-form form">
            <h3>ADD USER GROUP</h3>

            <Form.Group>
              <Form.Label>User group name</Form.Label>
              <Form.Control
                type="text"
                value={groupname}
                id="groupname"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>

            <Button className="submitButton" variant="success" type="submit">
              Add new user group
            </Button>
          </Form>
        </Box>
      </Modal>
    );
  };

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const AddModal = ({ open, handleClose }) => {
    const [username, setUsername] = useState("");
    const [userGroup, setUserGroup] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
      const getGroups = async () => {
        const response = await axios.get("/user-groups");
        const data = response.data;
        setUserOptions(data);
      };
      getGroups();
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

    const groupOptions = userOptions.map((group) => {
      // object for react-select options
      return { value: group.groupname, label: group.groupname };
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post("/add-user-to-group", {
          username,
          userGroup,
        });
        console.log(response);
        if (!response.data.error) {
          toast.success(`Added ${username} to ${userGroup}`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setUsername("");
          setUserGroup("");
          setSelectedOption(null);
        }
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setUsername("");
          setUserGroup("");
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form onSubmit={handleSubmit} className="add-form form">
            <h3>ADD USER TO GROUP</h3>
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                value={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group style={{ width: "400px" }}>
              <Form.Label>User group name</Form.Label>
              <CreatableSelect
                isMulti={true}
                value={selectedOption}
                onChange={handleUserGroup}
                options={groupOptions}
              />
            </Form.Group>

            <Button className="submitButton" variant="success" type="submit">
              Add user to group
            </Button>
          </Form>
        </Box>
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

  const RemoveModal = ({ open, handleClose }) => {
    const [username, setUsername] = useState("");
    const [userGroup, setUserGroup] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
      const getGroups = async () => {
        const response = await axios.get("/user-groups");
        const data = response.data;
        setUserOptions(data);
      };
      getGroups();
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

    const groupOptions = userOptions.map((group) => {
      // object for react-select options
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
            pauseOnHover: true,
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
            pauseOnHover: true,
          });
          setUsername("");
          setSelectedOption(null);
        }
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <Modal open={openRemove} onClose={handleCloseRemove}>
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

          <Form.Group style={{ width: "400px" }}>
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
      </Modal>
    );
  };
  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => {
    setOpenRemove(true);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  return (
    <div className="main-container">
      <ToastContainer />
      <LoggedIn />

      <CreateModal open={openCreate} handleClose={handleCloseCreate} />
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
      <RemoveModal open={openRemove} handleClose={handleCloseCreate} />

      <div className="manage">
        <div className="actions_menu">
          <Button onClick={handleOpenCreate}>Create Group</Button>
          <Button onClick={handleOpenAdd}>Add user to group</Button>
          <Button onClick={handleOpenRemove}>Remove from group</Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
