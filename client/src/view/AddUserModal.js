import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";

// UPDATE USER
// HOC WITH HOOKS
const AddUserModal = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const [userGroup, setUserGroup] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [groupOptions, setGroupOptions] = useState([]);

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
  const handleUserGroup = (selectedOption) => {
    setSelectedOption(selectedOption);
    selectedOption.forEach((option) => {
      const value = option.value;
      setUserGroup([...userGroup, value]);
    });
  };
  const groups = groupOptions.map((option) => {
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
    } catch (e) {
      console.log(e);
    }
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  return (
    <Modal open={openUpdate} onClose={handleCloseUpdate}>
      <Form className="add-form form" onSubmit={handleSubmit}>
        <h3>UPDATE USER</h3>
        <Form.Group style={{ width: "400px" }}>
          <Form.Label>Username</Form.Label>
          <Select value={selectedUser} onChange={handleUsername} options={userOptions} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="new password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="new email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>Status</Form.Label>
          <Select value={selectedActive} onChange={handleActive} options={activeOptions} />
        </Form.Group>

        <Form.Group style={{ width: "400px" }}>
          <Form.Label>User Group</Form.Label>
          <CreatableSelect isMulti={true} value={selectedOption} onChange={handleUserGroup} options={groups} />
        </Form.Group>

        <Button className="submitButton" variant="success" type="submit">
          Save user
        </Button>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
