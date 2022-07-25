import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useApi } from "../utils/useApi";

import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const getLogin = () =>
  //   axios.post("/auth", {
  //     username,
  //     password,
  //   });
  // const getLoginApi = useApi(getLogin);

  const login = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      // getLoginApi.request();
      const response = await axios.post("/auth", {
        username,
        password,
      });
      if (!response.data.error) {
        try {
          // CHECK ACTIVE STATUS
          const active = response.data[0].status;
          if (active === "Active") {
            localStorage.setItem("username", response.data[0].username);
            localStorage.setItem("email", response.data[0].email);

            // CHECK ADMIN STATUS
            const currentUser = localStorage.getItem("username");
            const admin = await axios.get("/checkgroup", {
              params: {
                username: currentUser,
                usergroup: "admin",
              },
            });

            if (admin.data === true) {
              localStorage.setItem("isAdmin", "admin");
              navigate("/management");
            } else {
              localStorage.setItem("isAdmin", "non-admin");
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
            setUsername("");
            setPassword("");
            navigate("/");
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        // RESET FIELDS
        setUsername("");
        setPassword("");
        navigate("/");
      }
      if (response.data.error) {
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
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="login-header">
        <Form onSubmit={login} className="login-form form">
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
