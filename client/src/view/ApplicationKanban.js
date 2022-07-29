import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Header from "./Header";

import AllPlans from "./AllPlans";
import AllOpenTasks from "./AllOpenTasks";

import Task from "./Task";
import AllTodoTasks from "./AllOpenTasks";

const ApplicationKanban = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [plan, setPlan] = useState([]);
  const [open, setOpen] = useState([]);
  const [todo, setTodo] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const openEditForm = () => setOpenEdit(true);
  const closeEditForm = () => setOpenEdit(false);

  const [openAddPlan, setOpenAddPlan] = useState(false);
  const openAddPlanForm = () => setOpenAddPlan(true);
  const closeAddPlanForm = () => setOpenAddPlan(false);

  const [openAddTask, setOpenAddTask] = useState(false);
  const openAddTaskForm = () => setOpenAddTask(true);
  const closeAddTaskForm = () => setOpenAddTask(false);

  const [projectLead, setProjectLead] = useState(false);
  const [projectManager, setProjectManager] = useState(false);

  const backToApplications = () => {
    navigate("/tasks");
  };

  const fetchApplication = async () => {
    const response = await axios.get("/get-application", {
      params: {
        app_acronym: param.app_acronym,
      },
    });
    setData(response.data[0]);
  };

  const getPlans = async () => {
    const response = await axios.get("/get-plans", {
      params: {
        plan_app_acronym: param.app_acronym,
      },
    });
    setPlan(response.data[0]);
  };

  const fetchOpen = async () => {
    const response = await axios.get("/get-open");
    setOpen(response.data);
  };

  const fetchTodo = async () => {
    const response = await axios.get("/get-todo");
    setTodo(response.data);
  };

  useEffect(() => {
    fetchApplication();
    getPlans();
    fetchOpen();
    fetchTodo();

    const userGroup = localStorage.getItem("user-group");
    if (userGroup === "project manager") {
      setProjectManager(true);
    }

    if (userGroup === "project lead") {
      setProjectLead(true);
    }
  }, []);

  const EditApp = ({ show, onHide }) => {
    const app_acronym = data.app_acronym;
    console.log(app_acronym);
    const app_Rnum = data.app_Rnum;
    const app_description = data.app_description;
    const [startDate, setStartDate] = useState(data.startDate);
    const [endDate, setEndDate] = useState(data.endDate);
    console.log(data.startDate);

    const [selectedOpen, setSelectedOpen] = useState();
    const [selectedTodo, setSelectedTodo] = useState();
    const [selectedDoing, setSelectedDoing] = useState();
    const [selectedDone, setSelectedDone] = useState();

    const [permitOpen, setPermitOpen] = useState(data.app_permitOpen);
    const defaultOpen = () => {
      return {
        label: permitOpen,
        value: permitOpen,
      };
    };
    const handleOpen = (selectedOpen) => {
      setSelectedOpen(selectedOpen);
      const value = selectedOpen.value;
      setPermitOpen(value);
    };

    const [permitTodo, setPermitTodo] = useState(data.app_permitToDo);
    const defaultTodo = () => {
      return {
        label: permitTodo,
        value: permitTodo,
      };
    };
    const handleTodo = (selectedTodo) => {
      setSelectedTodo(selectedTodo);
      const value = selectedTodo.value;
      setPermitTodo(value);
    };

    const [permitDoing, setPermitDoing] = useState(data.app_permitDoing);
    const defaultDoing = () => {
      return {
        label: permitDoing,
        value: permitDoing,
      };
    };
    const handleDoing = (selectedDoing) => {
      setSelectedDoing(selectedDoing);
      const value = selectedDoing.value;
      setPermitDoing(value);
    };

    const [permitDone, setPermitDone] = useState(data.app_permitDone);
    const defaultDone = () => {
      return {
        label: permitDone,
        value: permitDone,
      };
    };
    const handleDone = (selectedDone) => {
      setSelectedDone(selectedDone);
      const value = selectedDone.value;
      setPermitDone(value);
    };

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
        const response = await axios.put("/update-application", {
          app_acronym,
          startDate,
          endDate,
          permitOpen,
          permitTodo,
          permitDoing,
          permitDone,
        });
        console.log(response);

        if (!response.data.error) {
          toast.success(`Updated ${app_acronym}!`, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          fetchApplication();
        }
      } catch (e) {}
    };

    return (
      <Modal show={openEditForm} onHide={closeEditForm} size="xl" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Update application: {app_acronym}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>App name</Form.Label>
                  <Form.Control
                    readOnly
                    type="text"
                    placeholder={app_acronym}
                    id="app_name"
                  />
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group>
                  <Form.Label>Running Number</Form.Label>
                  <Form.Control type="number" readOnly placeholder={app_Rnum} />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  readOnly
                  as="textarea"
                  rows={3}
                  placeholder={app_description}
                  id="app_description"
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
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
                  // key={defaultOpen}
                  defaultValue={defaultOpen}
                  value={selectedOpen}
                  onChange={handleOpen}
                />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit ToDo</Form.Label>
                <Select
                  options={options}
                  name="permit_todo"
                  value={selectedTodo}
                  defaultValue={defaultTodo}
                  onChange={handleTodo}
                />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Doing</Form.Label>
                <Select
                  options={options}
                  name="permit_doing"
                  defaultValue={defaultDoing}
                  value={selectedDoing}
                  onChange={handleDoing}
                />
              </Form.Group>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Done</Form.Label>
                <Select
                  options={options}
                  name="permit_done"
                  defaultValue={defaultDone}
                  value={selectedDone}
                  onChange={handleDone}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Col>
                <Button className="btn-success" type="submit" xs={4}>
                  Update
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  const CreatePlan = ({ open, onHide }) => {
    const plan_app_acronym = data.app_acronym;
    const [planName, setPlanName] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/add-plan", {
          plan_app_acronym,
          planName,
          startDate,
          endDate,
        });
        console.log(response);
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          getPlans();
        } else if (!response.data.error) {
          toast.success("New plan created!", {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          getPlans();
        }
      } catch {}
    };
    return (
      <Modal
        show={openAddPlanForm}
        onHide={closeAddPlanForm}
        size="lg"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Modal.Title>{plan_app_acronym}</Modal.Title>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Plan name</Form.Label>
                  <Form.Control
                    type="text"
                    id="plan_name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Col>
                <Button className="btn-success" type="submit" xs={4}>
                  Create new plan
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  const CreateTask = ({ open, onHide }) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskNotes, setTaskNotes] = useState("");
    const [taskState, setTaskState] = useState("Open");
    const taskCreator = localStorage.getItem("username");

    const [selectedState, setSelectedState] = useState();

    const options = [
      {
        label: "Open",
        value: "Open",
      },
      {
        label: "To Do",
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

    const handleTaskState = (selectedState) => {
      setSelectedState(selectedState);
      const value = selectedState.value;
      setTaskState(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const app_acronym = data.app_acronym;
      const app_Rnum = data.app_Rnum;
      console.log(taskState);

      try {
        const response = await axios.post("/add-task", {
          app_Rnum,
          app_acronym,
          taskName,
          taskDescription,
          taskNotes,
          taskState,
          taskCreator,
        });
        console.log(response);
        if (!response.data.error) {
          toast.success("New task created!", {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setTaskName("");
          setTaskDescription("");
          setTaskNotes("");
          setTaskState("Open");
          fetchOpen();
          fetchTodo();
        }
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        }
      } catch {}
    };

    return (
      <Modal
        show={openAddTaskForm}
        onHide={closeAddTaskForm}
        size="lg"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Create a new task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Task name</Form.Label>
                  <Form.Control
                    type="text"
                    // placeholder={app_acronym}
                    id="app_name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  // placeholder={app_description}
                  id="app_description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Existing notes</Form.Label>
                  <Form.Control readOnly rows={3} id="app_notes" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Task notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="app_notes"
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <Form.Group>
                <Form.Label>Current State</Form.Label>
                <Select
                  options={options}
                  name="permit_todo"
                  value={selectedState}
                  // defaultValue={{ label: "Open", value: "Open" }}
                  defaultValue={options[0]}
                  onChange={handleTaskState}
                  getOptionValue={(option) => option.value}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <p>Created by: {taskCreator}</p>
            </Row>

            <Row>
              <Col>
                <Button className="btn-success" type="submit" xs={4}>
                  Create new task
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  const approveTask = async () => {
    try {
      // POST REQUEST
      const response = await axios.post("/approve-task", {});
    } catch (e) {}
  };

  return (
    <div className="application-kanban">
      <Header />

      <div className="application-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Kanban Board for: {param.app_acronym}
          </h2>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button variant="danger" onClick={backToApplications}>
              Back
            </Button>
            <Button onClick={openEditForm}>Update Application</Button>

            {projectLead && <Button onClick={openAddPlanForm}>Add Plan</Button>}
            {projectLead && (
              <Button onClick={openAddTaskForm}>Add tasks</Button>
            )}
          </div>
        </div>

        {openEdit && <EditApp show={openEdit} onHide={closeEditForm} />}
        {openAddPlan && (
          <CreatePlan show={openAddPlan} onHide={closeAddPlanForm} />
        )}

        {openAddTask && (
          <CreateTask show={openAddTask} onHide={closeAddTaskForm} />
        )}

        <div className="tasks-container">
          <div className="plans">
            <div>
              <h3>Plan</h3>
            </div>
            <AllPlans />
          </div>

          <div>
            <div>
              <h3>Open</h3>
            </div>
            <div>
              {/* <AllOpenTasks /> */}
              {open.map((task) => {
                return (
                  <>
                    <Card
                      style={{ borderRadius: "15px", marginBottom: "10px" }}
                    >
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                      />
                      {projectManager && (
                        <Button variant="success" onClick={approveTask}>
                          Approve
                        </Button>
                      )}
                    </Card>
                  </>
                );
              })}
            </div>
          </div>

          <div>
            <div>
              <h3>To-Do</h3>
            </div>

            <div>
              {/* <AllTodoTasks /> */}
              {todo.map((task) => {
                return (
                  <Task
                    taskName={task.task_name}
                    taskDescription={task.task_description}
                    taskState={task.task_state}
                    taskOwner={task.task_owner}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h3>Doing</h3>
          </div>

          <div>
            <h3>Done</h3>
          </div>

          <div>
            <h3>Close</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationKanban;
