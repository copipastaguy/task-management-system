import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserUpdate from "./UserUpdate";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@mui/material/Modal";

const Header = () => {
  const user = sessionStorage.getItem("username");
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // const [displayUpdate, setDisplayUpdate] = useState(false);
  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/");
  };

  const UserUpdate = ({ open, handleClose }) => {
    const username = sessionStorage.getItem("username");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [enable, setEnable] = useState("");

    const [userGroup, setUserGroup] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [userOptions, setUserOptions] = useState([]);

    const [active, setActive] = useState("");
    const [selectedActive, setSelectedActive] = useState();

    // - - - PASS IN EMPTY DEPENDACY ARRAY FOR FUNCTION TO RUN ONCE - - -
    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      const data = response.data;
      setUserOptions(data);
    };

    useEffect(() => {
      // getGroups();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        //  POST request to update user detail
        const response = await axios.post("/user-update", {
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
          toast.success("Updated", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setPassword("");
          setEmail("");
        }
        // RESET FIELDS
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <Form className="add-form form" onSubmit={handleSubmit}>
          <h3>UPDATE {username}</h3>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              // required
              type="password"
              // placeholder="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              // placeholder="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button className="submitButton" variant="success" type="submit">
            Save user
          </Button>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="login-header nav-bar">
      <h4>
        Welcome: <span>{user}</span>
      </h4>
      <Form>
        <Button onClick={handleOpenUpdate}>Update Details</Button>
        <Button className="btn-danger" onClick={handleSignout}>
          Sign out
        </Button>
      </Form>
      <UserUpdate open={openUpdate} handleClose={handleCloseUpdate} />
    </div>
  );
};

export default Header;
