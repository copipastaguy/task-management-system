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

  const login = async (e) => {
    e.preventDefault();

    // POST request for user database
    try {
      const response = await axios.post("/auth", {
        username,
        password,
      });
      console.log(response);
      if (!response.data.error) {
        try {
          // CHECK ACTIVE STATUS
          const active = response.data.userInfo.status;
          const isAdmin = response.data.isAdmin;
          const isLead = response.data.isLead;
          const isManager = response.data.isManager;
          const usergroup = response.data.userInfo.user_group;
          const jwtToken = response.data.jwtToken;

          if (active === "Active") {
            sessionStorage.setItem("isAdmin", isAdmin);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("usergroup", usergroup);
            sessionStorage.setItem("jwtToken", jwtToken);

            if (isAdmin === true) {
              navigate("/management");
            } else if (isAdmin === false) {
              navigate("/tasks");
              if (isLead === true) {
                sessionStorage.setItem("isLead", isLead);
              } else if (isManager === true) {
                sessionStorage.setItem("isManager", isManager);
              }
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
              autoFocus
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
