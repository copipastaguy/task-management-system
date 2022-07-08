import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });
      console.log(response);
      if (!response.data.error) {
        // console.log(response.data);
        // returns array of data

        // CHECK IF USER IS DISABLED
        const enabled = response.data[0].isEnabled;
        if (enabled === "True") {
          localStorage.setItem("username", response.data[0].username);
          localStorage.setItem("email", response.data[0].email);

          // CONDITIONAL RENDERING BASED ON USER/ ADMIN
          const isAdmin = response.data[0].admin_privilege;
          if (isAdmin === 1) {
            navigate("/management");
          } else {
            navigate("/tasks");
          }
        }
      } else {
        // RESET FIELDS
        setUsername("");
        setPassword("");
        navigate("/");
      }
      if (response.data.error) {
        console.log(response.data.error);
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        // RESET FIELDS
        setUsername("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-header">
        <h2>TASKY</h2>
        <Form onSubmit={handleSubmit} className="login-form form">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
