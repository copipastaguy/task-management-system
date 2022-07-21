import React, { useState, useEffect } from "react";
import Task from "./Task";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import CreateApp from "./CreateApp";
import { toast, ToastContainer } from "react-toastify";

const TasksBoard = () => {
  // LOCALSTORAGE USERNAME
  const user = localStorage.getItem("username");
  const [projectlead, setProjectLead] = useState();

  // FETCH project lead user group
  const checkGroup = async () => {
    const response = await axios.get("/checkgroup", {
      params: {
        username: user,
        usergroup: "project lead",
      },
    });
    if (response.data === true) {
      localStorage.setItem("user-group", "project lead");
      setProjectLead("project lead");
      console.log(projectlead);
    }
  };

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const CreateTask = ({ open, handleClose }) => {
    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(appName);

      setAppName("");
    };
    return (
      <Modal open={openForm} onClose={handleCloseForm}>
        <Form className="add-form form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>App name</Form.Label>
            <Form.Control
              type="text"
              placeholder="app name"
              value={appName}
              id="app_name"
              onChange={(e) => setAppName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Running Number</Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>App description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="app description"
              value={appDescription}
              id="app_description"
              onChange={(e) => setAppDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal>
    );
  };

  useEffect(() => {
    checkGroup();
  });

  return (
    <div className="main-container tasks-board">
      <h3>Application Board.</h3>
      <ToastContainer />
      <Button onClick={handleOpenForm}>Create task</Button>
      {/* 
      {projectlead && (
        <>
          <Button onClick={handleOpenForm}>Create task</Button>
        </>
      )} */}

      <CreateTask open={openForm} onClose={handleCloseForm} />

      <div className="tasks-container">
        <div>
          <p>Open</p>
          <Task />
        </div>
        <div>
          <p>To-Do</p>
        </div>
        <div>
          <p>Doing</p>
        </div>
        <div>
          <p>Done</p>
        </div>
      </div>
    </div>
  );
};

export default TasksBoard;
