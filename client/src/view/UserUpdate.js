import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const AdminUpdateUser = () => {
  // array of usernames fetched
  const username = sessionStorage.getItem("username");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  POST request to update user detail
      const response = await axios.post("/user-update", {
        username,
        password,
        email,
      });
      console.log(response.data);
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
      if (!response.data.error) {
        toast.success("Updated", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
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
    <div className="main-container">
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
    </div>
  );
};

export default AdminUpdateUser;
