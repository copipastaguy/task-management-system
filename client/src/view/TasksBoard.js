import React, { useState, useEffect } from "react";
import Task from "./Task";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";
import Applications from "./Applications";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import useApi from "../utils/useApi";

const TasksBoard = () => {
  // LOCALSTORAGE USERNAME
  const user = localStorage.getItem("username");
  const [projectlead, setProjectLead] = useState();

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const openCreateApp = () => {
    setOpenCreateForm(true);
  };
  const closeCreateApp = () => {
    setOpenCreateForm(false);
  };

  const [openTaskForm, setOpenTaskForm] = useState(false);
  const openCreateTask = () => {
    setOpenTaskForm(true);
  };

  const closeCreateTask = () => {
    setOpenTaskForm(false);
  };

  // CHECK GROUP FUNCTION
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
    }
  };

  const getApplications = () => axios.get("/applications");
  const getApplicationsApi = useApi(getApplications);

  useEffect(() => {
    checkGroup();
    getApplicationsApi.request();
  }, []);

  const CreateApp = ({ open, handleClose }) => {
    const [appAcronym, setAppAcronym] = useState("");
    const [appRnum, setAppRnum] = useState("");
    const [appDescription, setAppDescription] = useState("");
    const [permitOpen, setPermitOpen] = useState();
    const [selectedOpen, setSelectedOpen] = useState();

    const options = [
      {
        value: "project manager",
        label: "project manager",
      },
      {
        value: "project lead",
        label: "project lead",
      },
      {
        value: "team member",
        label: "team member",
      },
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setPermitOpen(selectedOpen);
        ///////////////////// ADD APPLICATION /////////////////////////////
        const response = await axios.post("/add-application", {
          appAcronym,
          appDescription,
          permitOpen: permitOpen.value,
        });

        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        } else if (!response.data.error) {
          toast.success(`Added ${appAcronym}!`, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          getApplicationsApi.request();

          // RESET FIELDS
          setAppAcronym("");
          setAppDescription("");
          setPermitOpen(null);
        }
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <Modal open={openCreateForm} onClose={closeCreateApp}>
        <Form className="add-form form" onSubmit={handleSubmit}>
          <h3>Create a new App</h3>
          <Form.Group>
            <Form.Label>App name</Form.Label>
            <Form.Control
              type="text"
              placeholder="app name"
              value={appAcronym}
              id="app_name"
              onChange={(e) => setAppAcronym(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Running Number</Form.Label>
            <Select options={[]} name="running_number" />
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

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Permit Open</Form.Label>
            <Select
              options={options}
              name="permit_open"
              value={selectedOpen}
              onChange={setPermitOpen}
            />
          </Form.Group>

          {/* <Form.Group style={{ width: "400px" }}>
            <Form.Label>Permit ToDo</Form.Label>
            <Select options={options} name="permit_open" />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Permit Doing</Form.Label>
            <Select options={options} name="permit_open" />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>Permit Done</Form.Label>
            <Select options={options} name="permit_open" />
          </Form.Group> */}

          <Button className="btn-success" type="submit">
            Create App
          </Button>
        </Form>
      </Modal>
    );
  };

  const CreateTask = ({ open, handleClose }) => {
    const [taskName, setTaskName] = useState();
    const [taskDescription, setTaskDescription] = useState();
    const [taskNotes, setTaskNotes] = useState();
    const options = [
      {
        label: "ToDo",
        value: "ToDo",
      },
      {
        label: "Doing",
        value: "Doing",
      },
      {
        label: "Done",
        value: "Done",
      },
      {
        label: "Close",
        value: "Close",
      },
    ];
    return (
      <Modal open={openTaskForm} onClose={closeCreateTask}>
        <Form className="add-form form">
          <h3>Create a new task</h3>

          <Form.Group>
            <Form.Label>Task name</Form.Label>
            <Form.Control
              type="text"
              placeholder="task name"
              value={taskName}
              id="app_name"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Running Number</Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>Task description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="task description"
              value={taskDescription}
              id="app_description"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Task notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="task description"
              value={taskNotes}
              id="app_description"
              onChange={(e) => setTaskNotes(e.target.value)}
            />
          </Form.Group>

          <Form.Group style={{ width: "400px" }}>
            <Form.Label>State</Form.Label>
            <Select
              options={options}
              name="task_state"
              // value={permitOpen}
              // onChange={setPermitOpen}
            />
          </Form.Group>

          <Button className="btn-success" type="submit">
            Create new task
          </Button>
        </Form>
      </Modal>
    );
  };

  const editApp = () => {};

  return (
    <div className="main-container tasks-board">
      <ToastContainer />
      <h3>Kanban Board</h3>

      <div className="application-container">
        {getApplicationsApi.data.map((application) => {
          return (
            <div className="application">
              <Applications
                acronym={application.app_acronym}
                description={application.app_description}
                open={application.app_permitOpen}
                key={application.acronym}
                editApp={editApp}
              />
            </div>
          );
        })}
      </div>

      {projectlead && (
        <div>
          <Button onClick={openCreateApp}>Create App</Button>
          <Button onClick={openCreateTask}>Create New Task</Button>
          <CreateApp open={openCreateForm} onClose={closeCreateApp} />
          <CreateTask open={openTaskForm} onClose={closeCreateTask} />
        </div>
      )}

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
