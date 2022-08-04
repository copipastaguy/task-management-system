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
// import { useApi } from "../utils/useApi";

const TasksBoard = () => {
  // LOCALSTORAGE USERNAME
  const user = localStorage.getItem("username");
  const [groups, setGroups] = useState([]);

  const [projectlead, setProjectLead] = useState(false);
  // const [projectManager, setProjectManager] = useState(false);

  const [applications, setApplications] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [rNum, setRnum] = useState("");

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const openCreateApp = () => setOpenCreateForm(true);
  const closeCreateApp = () => setOpenCreateForm(false);

  // CHECK IF USER IS A SPECIFIC USER GROUP FUNCTION
  const checkGroup = async () => {
    const response_lead = await axios.get("/checkgroup", {
      params: {
        username: user,
        usergroup: "project lead",
      },
    });
    if (response_lead.data === true) {
      localStorage.setItem("user-group", "project lead");
      setProjectLead(true);
    }

    const response_manager = await axios.get("/checkgroup", {
      params: {
        username: user,
        usergroup: "project manager",
      },
    });
    if (response_manager.data === true) {
      localStorage.setItem("user-group", "project manager");
      // setProjectManager(true);
    }
  };

  const getApplications = async () => {
    const response = await axios.get("/get-applications");
    setApplications(response.data[0]);
    setRnum(response.data[1].max + 1);
  };

  const getGroups = async () => {
    const response = await axios.get("/user-groups");
    setGroups(response.data);
  };

  useEffect(() => {
    checkGroup();
    getApplications();
    getGroups();
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
    const [selectedTodo, setSelectedTodo] = useState();
    const [selectedDoing, setSelectedDoing] = useState();
    const [selectedDone, setSelectedDone] = useState();

    const options = groups.map((group) => {
      const value = group.groupname;
      return {
        label: value,
        value: value,
      };
    });

    const handlePermitOpen = (selectedOpen) => {
      const value = selectedOpen.value;
      setPermitOpen(value);
    };

    const handlePermitToDo = (selectedTodo) => {
      const value = selectedTodo.value;
      setPermitTodo(value);
    };

    const handlePermitDoing = (selectedDoing) => {
      const value = selectedDoing.value;
      setPermitDoing(value);
    };

    const handlePermitDone = (selectedDone) => {
      const value = selectedDone.value;
      setPermitDone(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        ///////////////////// ADD APPLICATION /////////////////////////////
        const response = await axios.post("/add-application", {
          app_acronym,
          app_description,
          rNum,
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
          getApplications();
        } else if (!response.data.error) {
          toast.success(`Added ${app_acronym}!`, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          getApplications();

          // RESET FIELDS
          setAppAcronym("");
          setAppDescription("");
          setAppRnum();
          setSelectedOpen(null);
          setSelectedTodo(null);
          setSelectedDoing(null);
          setSelectedDoing(null);
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
                    value={rNum}
                    readOnly={rNum > 0 ? true : false}
                    // onChange={(e) => setAppRnum(e.target.value)}
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
                <Select
                  options={options}
                  name="permit_todo"
                  onChange={handlePermitToDo}
                  value={selectedTodo}
                  getOptionValue={(option) => option.value}
                />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Doing</Form.Label>
                <Select
                  options={options}
                  name="permit_doing"
                  onChange={handlePermitDoing}
                  value={selectedDoing}
                  getOptionValue={(option) => option.value}
                />
              </Form.Group>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Done</Form.Label>
                <Select
                  options={options}
                  name="permit_done"
                  onChange={handlePermitDone}
                  value={selectedDone}
                  getOptionValue={(option) => option.value}
                />
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
      <h3 style={{ color: "white" }}>Applications</h3>
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
