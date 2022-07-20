import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });
      // RESPONSE FROM CHECKGROUP
      console.log(response);
      if (!response.data.error) {
        // try {
        //   const admin = await axios.post("/checkadmin", {
        //     username,
        //   });
        //   console.log(admin);
        //   if (admin.data[0].admin_privilege === "1") {
        //   }
        // } catch (e) {
        //   console.log(e);
        // }

        // GET USER ADMIN PRIVILEGES
        const isAdmin = response.data[0].admin_privilege;
        // CHECK IF USER IS DISABLED
        const active = response.data[0].status;
        if (active === "Active") {
          localStorage.setItem("username", response.data[0].username);
          localStorage.setItem("email", response.data[0].email);
          localStorage.setItem("isAdmin", response.data[0].admin_privilege);
          sessionStorage.setItem("username", response.data[0].username);
          sessionStorage.setItem("email", response.data[0].email);
          sessionStorage.setItem("isAdmin", response.data[0].admin_privilege);
          // CONDITIONAL RENDERING BASED ON USER/ ADMIN
          const isAdmin = response.data[0].admin_privilege;
          if (isAdmin === 1) {
            navigate("/management");
          } else {
            navigate("/tasks");
          }
        } else if (active === "Inactive") {
          toast.error("Unable to login", {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      } else {
        // RESET FIELDS
        // setUsername("");
        // setPassword("");
        // navigate("/");
      }
      if (response.data.error) {
        // console.log(response.data.error);
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
    <div className="main-container">
      <ToastContainer />
      <div className="login-header">
        <Form onSubmit={handleSubmit} className="login-form form">
          <h4>Enter your details to sign in</h4>
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

          <Button
            variant="primary"
            type="submit"
            style={{
              width: "400px",
              backgroundColor: "#fca311",
              border: "none",
              padding: "10px",
            }}
          >
            LOGIN
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
