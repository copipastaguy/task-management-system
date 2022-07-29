import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Modal from "@mui/material/Modal";
import AllApplications from "./AllApplications";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import { useApi } from "../utils/useApi";

const TasksBoard = () => {
  // LOCALSTORAGE USERNAME
  const user = localStorage.getItem("username");
  const [projectlead, setProjectLead] = useState();
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const openCreateApp = () => setOpenCreateForm(true);
  const closeCreateApp = () => setOpenCreateForm(false);

  const [openTaskForm, setOpenTaskForm] = useState(false);
  const openCreateTask = () => setOpenTaskForm(true);
  const closeCreateTask = () => setOpenTaskForm(false);

  // CHECK IF USER IS A PROJECT LEAD FUNCTION
  const checkGroup = async () => {
    const response_lead = await axios.get("/checkgroup", {
      params: {
        username: user,
        usergroup: "project lead",
      },
    });
    if (response_lead.data === true) {
      localStorage.setItem("user-group", "project lead");
      setProjectLead("project lead");
    }

    const response_manager = await axios.get("/checkgroup", {
      params: {
        username: user,
        usergroup: "project manager",
      },
    });

    if (response_manager.data === true) {
      localStorage.setItem("user-group", "project manager");
      setProjectLead("project manager");
    }
  };

  // const getApplications = () => axios.get("/applications");
  // const getApplicationsApi = useApi(getApplications);

  const getApplications = async () => {
    const response = await axios.get("/get-applications");
    setApplications(response.data);
  };

  const getTasks = async () => {
    const response = await axios.get("/get-tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    checkGroup();
    getApplications();
    // getApplicationsApi.request();
    getTasks();
  }, []);

  const CreateApp = ({ show, onHide }) => {
    const [app_acronym, setAppAcronym] = useState("");
    const [app_Rnum, setAppRnum] = useState("");
    const [app_description, setAppDescription] = useState("");
    const [app_startDate, setStartDate] = useState(null);
    const [app_endDate, setEndDate] = useState(null);

    const [permitOpen, setPermitOpen] = useState();
    const [permitTodo, setPermitTodo] = useState();
    const [permitDoing, setPermitDoing] = useState();
    const [permitDone, setPermitDone] = useState();

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

    const handlePermitOpen = (selectedOpen) => {
      const value = selectedOpen.value;
      setPermitOpen(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        ///////////////////// ADD APPLICATION /////////////////////////////
        const response = await axios.post("/add-application", {
          app_acronym,
          app_description,
          app_Rnum,
          app_startDate,
          app_endDate,
          permitOpen,
        });
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          // setSelectedOpen(null);
        } else if (!response.data.error) {
          toast.success(`Added ${app_acronym}!`, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          // getApplicationsApi.request();
          getApplications();

          // RESET FIELDS
          setAppAcronym("");
          setAppDescription("");
          setAppRnum();
          setSelectedOpen(null);
        }
      } catch (e) {
        console.error(e);
      }
    };

    return (
      <Modal
        show={openCreateForm}
        onHide={closeCreateApp}
        size="xl"
        centered
        style={{ margin: "auto", border: "1px solid" }}
      >
        <Form
          className=""
          onSubmit={handleSubmit}
          style={{
            alignItems: "center",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Modal.Header>
            <Modal.Title>Create new app</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>
                    App name <span>(required)</span>
                  </Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Application"
                    value={app_acronym}
                    id="app_name"
                    onChange={(e) => setAppAcronym(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group>
                  <Form.Label>
                    Running Number <span>(required)</span>
                  </Form.Label>

                  <Form.Control
                    type="number"
                    value={app_Rnum}
                    onChange={(e) => setAppRnum(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Group>
                <Form.Label>
                  Description <span>(required)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  value={app_description}
                  id="app_description"
                  onChange={(e) => setAppDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={app_startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={app_endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Open</Form.Label>
                <Select
                  options={options}
                  name="permit_open"
                  value={selectedOpen}
                  onChange={handlePermitOpen}
                  getOptionValue={(option) => option.value}
                />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit ToDo</Form.Label>
                <Select options={options} name="permit_open" />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Doing</Form.Label>
                <Select options={options} name="permit_open" />
              </Form.Group>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Done</Form.Label>
                <Select options={options} name="permit_open" />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Col>
                <Button className="btn-success" type="submit" xs={4}>
                  Create new App
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="main-container tasks-board">
      <ToastContainer />
      <h3>Applications</h3>
      {projectlead && (
        <div>
          <Button onClick={openCreateApp}>Create new App</Button>
          <CreateApp show={openCreateForm} onHide={closeCreateApp} />
        </div>
      )}

      <div className="application-container">
        <AllApplications />
      </div>

      <div className="tasks-container"></div>
    </div>
  );
};

export default TasksBoard;
