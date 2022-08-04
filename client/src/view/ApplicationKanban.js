import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { useParams, useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Header from "./Header";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiFillEdit,
  AiFillCheckCircle,
  AiFillEye,
} from "react-icons/ai";

import { IoIosAddCircle } from "react-icons/io";

import AllPlans from "./AllPlans";
import Task from "./Task";

const ApplicationKanban = () => {
  const { app_acronym } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [plans, setPlans] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);

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

  const taskCreator = localStorage.getItem("username");
  const taskOwner = localStorage.getItem("username");

  const [permitOpen, setPermitOpen] = useState(false);
  const [permitTodo, setPermitTodo] = useState(false);
  const [permitDoing, setPermitDoing] = useState(false);
  const [permitDone, setPermitDone] = useState(false);

  const today = new Date();
  let day = today.getDate();
  if (day < 10) day = "0" + day;
  let month = today.getMonth() + 1;
  if (month < 10) month = "0" + month;
  const year = today.getFullYear();
  const now = `${year}-${month}-${day}`;
  const time = new Date().toTimeString().slice(0, 8);

  // FETCH APPLICATION INFORMATIONS
  const fetchApplication = async () => {
    const response = await axios.get("/get-application", {
      params: {
        app_acronym: app_acronym,
      },
    });
    setData(response.data[0]);

    const fetchPermitOpen = async () => {
      const permitOpenUser = await axios.get("/checkgroup", {
        params: {
          username: taskOwner,
          usergroup: response.data[0].app_permitOpen,
        },
      });
      if (permitOpenUser.data === true) setPermitOpen(true);
    };

    const fetchPermitTodo = async () => {
      const permitTodoUser = await axios.get("/checkgroup", {
        params: {
          username: taskOwner,
          usergroup: response.data[0].app_permitToDo,
        },
      });
      if (permitTodoUser.data === true) setPermitTodo(true);
    };

    const fetchPermitDoing = async () => {
      const permitDoingUser = await axios.get("/checkgroup", {
        params: {
          username: taskOwner,
          usergroup: response.data[0].app_permitDoing,
        },
      });
      if (permitDoingUser.data === true) setPermitDoing(true);
    };

    const fetchPermitDone = async () => {
      const permitDoingUser = await axios.get("/checkgroup", {
        params: {
          username: taskOwner,
          usergroup: response.data[0].app_permitDone,
        },
      });
      if (permitDoingUser.data === true) setPermitDone(true);
    };

    fetchPermitOpen();
    fetchPermitTodo();
    fetchPermitDoing();
    fetchPermitDone();
  };

  // GET PLANS ASSOCIATED WITH APPLICATION
  const getPlans = async () => {
    const response = await axios.get("/get-plans", {
      params: {
        plan_app_acronym: app_acronym,
      },
    });
    setPlans(response.data);
  };

  // GET TASKS ASSOCIATED WITH APPLICATION
  const fetchTasks = async () => {
    const response = await axios.get("/get-tasks", {
      params: {
        plan_app_acronym: app_acronym,
      },
    });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchApplication();
    getPlans();
    // CHECK GROUP FOR DIFFERENT STATE CHANGE
    const userGroup = localStorage.getItem("user-group");
    if (userGroup === "project manager") {
      setProjectManager(true);
    }

    if (userGroup === "project lead") {
      setProjectLead(true);
    }

    const getGroups = async () => {
      const response = await axios.get("/user-groups");
      setGroups(response.data);
    };
    getGroups();
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

    const options = groups.map((group) => {
      const value = group.groupname;
      return {
        label: value,
        value: value,
      };
    });

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
                  readOnly={!projectLead && true}
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  readOnly={!projectLead && true}
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
                  isDisabled={!projectLead && true}
                  options={options}
                  name="permit_open"
                  defaultValue={defaultOpen}
                  value={selectedOpen}
                  onChange={handleOpen}
                  isClearable
                />
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit ToDo</Form.Label>
                <Select
                  isDisabled={!projectLead && true}
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
                  isDisabled={!projectLead && true}
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
                  isDisabled={!projectLead && true}
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
                {projectLead && (
                  <Button className="btn-success" type="submit" xs={4}>
                    Update
                  </Button>
                )}
              </Col>
            </Row>
          </Modal.Body>
        </Form>
      </Modal>
    );
  };

  const CreatePlan = ({ open, onHide }) => {
    const app_acronym = data.app_acronym;
    const [planName, setPlanName] = useState();

    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(now);

    const [planColor, setPlanColor] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/add-plan", {
          app_acronym,
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
        } else if (!response.data.error) {
          toast.success("New plan created!", {
            position: "top-center",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setPlanName("");
          await getPlans();
        }
      } catch (e) {
        console.warn(e);
      }
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
            <Modal.Title>{app_acronym}</Modal.Title>
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

              <Col>
                {/* <Form.Group>
                  <Form.Label>Choose a color</Form.Label>
                  <Form.Control
                    type="color"
                    defaultValue="#000000"
                    value={planColor}
                    onChange={(e) => {
                      console.log(planColor);
                      setPlanColor(e.target.value);
                    }}
                  />
                </Form.Group> */}
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
    const [taskPlan, setTaskPlan] = useState();

    const [selectedPlan, setSelectedPlan] = useState();

    // FETCH ALL PLANS AVAILABLE
    const availPlans = plans.map((plan) => {
      const value = plan.plan_mvp_name;
      return {
        label: value,
        value: value,
      };
    });

    const handleTaskPlan = (selectedPlan) => {
      // setSelectedPlan(selectedPlan);
      const value = selectedPlan.value;
      setTaskPlan(value);
      console.log(value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const app_acronym = data.app_acronym;
      const app_Rnum = data.app_Rnum;
      const note = `${now} ${time}: ${taskState}\n${taskCreator}\nNew task have been created`;

      try {
        const response = await axios.post("/add-task", {
          app_Rnum,
          app_acronym,
          taskName,
          taskDescription,
          taskNotes,
          taskPlan,
          taskState,
          taskCreator,
          taskOwner,
          note,
        });
        console.log(response);
        if (!response.data.error) {
          toast.success(response.data, {
            position: "top-center",
            autoClose: 800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setTaskName("");
          setTaskDescription("");
          setTaskNotes("");
          setTaskState("Open");
          fetchTasks();
        }
        if (response.data.error) {
          toast.error(response.data.error, {
            position: "top-center",
            autoClose: 800,
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
        <Form
          onSubmit={handleSubmit}
          // style={{ backgroundColor: "#343A40", color: "white" }}
          className="editTask"
        >
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
                    placeholder="Task name"
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
                  placeholder="Some descriptions"
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
                  <Form.Label>Task notes</Form.Label>
                  <Form.Control
                    placeholder="Some notes"
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
              <Col>
                <Form.Group>
                  <Form.Label>Assign a Plan</Form.Label>
                  <Select
                    options={availPlans}
                    name="task_plan"
                    value={selectedPlan}
                    onChange={handleTaskPlan}
                    // getOptionValue={(option) => option.value}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />

            <Row>
              <p>Created by: project_lead</p>
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
          <h2 style={{ textAlign: "center", fontSize: "40px" }}>
            {data.app_acronym}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button variant="danger" onClick={() => navigate("/tasks")}>
              Back
            </Button>
            <Button onClick={openEditForm}>
              <AiFillEdit />
              Application
            </Button>

            {projectManager && (
              <Button onClick={openAddPlanForm}>
                <IoIosAddCircle /> Plan
              </Button>
            )}

            {projectLead && (
              <Button onClick={openAddTaskForm}>
                <IoIosAddCircle /> Task
              </Button>
            )}
          </div>
          {/* <div>
            <div>App running number: </div>
          </div> */}
        </div>

        {openEdit && <EditApp show={openEdit} onHide={closeEditForm} />}
        {openAddPlan && (
          <CreatePlan show={openAddPlan} onHide={closeAddPlanForm} />
        )}

        {openAddTask && (
          <CreateTask show={openAddTask} onHide={closeAddTaskForm} />
        )}

        <div className="tasks-container">
          <div>
            <div className="col-header">
              <p>PLAN</p>
            </div>
            <AllPlans plans={plans} />
          </div>

          <div>
            <div className="col-header">
              <p>OPEN</p>
            </div>
            <div>
              {tasks.map((task) => {
                const approveTask = async () => {
                  const newState = "ToDo";
                  const note = `${now} ${time}: ${newState} \n${taskCreator} \nTask has been approved`;
                  try {
                    const response = await axios.post("/move-task-todo", {
                      task_name: task.task_name,
                      newState,
                      note,
                      taskOwner,
                    });
                    fetchTasks();
                    if (response.data) {
                      toast.success(`Move ${task.task_name} to ToDo!`, {
                        position: "top-center",
                        autoClose: 700,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                      });
                    }
                  } catch (e) {
                    console.warn(e);
                  }
                };
                if (task.task_state === "Open") {
                  return (
                    // <Card style={{ marginBottom: "10px" }} key={task.task_name}>
                    <div
                      style={{ marginBottom: "10px", color: "#DEE2E6" }}
                      key={task.task_name}
                    >
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                      />
                      {permitOpen && (
                        <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                          <Button style={{ width: "100%" }}>
                            <AiFillEdit />
                          </Button>
                        </Link>
                      )}

                      {permitOpen ? (
                        <div className="buttons-container">
                          <Button variant="success" onClick={approveTask}>
                            <AiFillCheckCircle />
                          </Button>
                        </div>
                      ) : (
                        <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                          <Button style={{ width: "100%" }}>
                            <AiFillEye />
                          </Button>
                        </Link>
                      )}
                    </div>
                    // {/* </Card> */}
                  );
                }
              })}
            </div>
          </div>

          <div>
            <div className="col-header">
              <p>TO-DO</p>
            </div>
            <div>
              {tasks.map((task) => {
                const MoveTaskToDoing = async () => {
                  const newState = "Doing";
                  const response = await axios.post("/move-task-doing", {
                    task_name: task.task_name,
                    newState,
                    taskOwner,
                  });
                  if (response.data) {
                    toast.success(`Move ${task.task_name} to Doing!`, {
                      position: "top-center",
                      autoClose: 700,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                  }
                  fetchTasks();
                };
                if (task.task_state === "ToDo") {
                  // fetchPermitTodo();
                  return (
                    // <Card style={{ marginBottom: "10px" }} key={task.task_name}>
                    <div
                      style={{
                        marginBottom: "10px",
                        color: "#DEE2E6",
                        width: "100%",
                      }}
                      key={task.task_name}
                    >
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                      />
                      <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                        <Button style={{ width: "100%" }}>
                          <AiFillEye />
                        </Button>
                      </Link>

                      {permitTodo && (
                        <div>
                          <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                            <Button style={{ width: "100%" }}>
                              <AiFillEdit />
                            </Button>
                          </Link>
                          <Button
                            style={{ width: "100%" }}
                            variant="success"
                            onClick={() => MoveTaskToDoing()}
                          >
                            <AiOutlineArrowRight />
                          </Button>
                        </div>
                      )}
                    </div>
                    //  </Card>
                  );
                }
              })}
            </div>
          </div>

          <div>
            <div className="col-header">
              <p>DOING</p>
            </div>
            <div>
              {tasks.map((task) => {
                const MoveTaskToDone = async () => {
                  const newState = "Done";
                  const response = await axios.post("/move-task-done", {
                    task_name: task.task_name,
                    newState,
                    taskOwner,
                  });
                  if (response.data) {
                    toast.success(`Move ${task.task_name} to Done!`, {
                      position: "top-center",
                      autoClose: 700,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                    fetchTasks();
                  }
                };
                const MoveTaskToDo = async () => {
                  const newState = "ToDo  ";
                  const response = await axios.post("/move-task-todo", {
                    task_name: task.task_name,
                    newState,
                    taskOwner,
                  });

                  if (response.data) {
                    toast.success(`Move ${task.task_name} to To-Do!`, {
                      position: "top-center",
                      autoClose: 700,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                    fetchTasks();
                  }
                };
                if (task.task_state === "Doing") {
                  return (
                    //<Card style={{ marginBottom: "10px" }} key={task.task_name}>
                    <div
                      style={{ marginBottom: "10px", color: "#DEE2E6" }}
                      key={task.task_name}
                    >
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                      />

                      <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                        <Button style={{ width: "100%" }}>
                          <AiFillEye />
                        </Button>
                      </Link>

                      {permitDoing && (
                        <div className="buttons-container">
                          <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                            <Button style={{ width: "100%" }}>
                              <AiFillEdit />
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => MoveTaskToDo()}
                          >
                            <AiOutlineArrowLeft />
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => MoveTaskToDone()}
                          >
                            <AiOutlineArrowRight />
                          </Button>
                        </div>
                      )}
                    </div>
                    //</Card>
                  );
                }
              })}
            </div>
          </div>

          <div>
            <div className="col-header">
              <p>DONE</p>
            </div>
            {tasks.map((task) => {
              const MoveTaskDoing = async () => {
                const newState = "Doing";
                const response = await axios.post("/move-task-doing", {
                  task_name: task.task_name,
                  newState,
                  taskOwner,
                });
                if (response.data) {
                  toast.success(`Move ${task.task_name} to Doing!`, {
                    position: "top-center",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                  });
                  fetchTasks();
                }
              };
              const MoveTaskToClose = async () => {
                const newState = "Closed";
                const response = await axios.post("/move-task-close", {
                  task_name: task.task_name,
                  newState,
                  taskOwner,
                });
                if (response.data) {
                  toast.success(`Move ${task.task_name} to Closed!`, {
                    position: "top-center",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                  });
                  fetchTasks();
                }
              };

              if (task.task_state === "Done") {
                return (
                  //<Card style={{ marginBottom: "10px" }} key={task.task_name}>
                  <div
                    style={{ marginBottom: "10px", color: "#DEE2E6" }}
                    key={task.task_name}
                  >
                    <Task
                      taskName={task.task_name}
                      taskDescription={task.task_description}
                      taskState={task.task_state}
                      taskOwner={task.task_owner}
                    />
                    <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                      <Button style={{ width: "100%" }}>
                        <AiFillEdit />
                      </Button>
                    </Link>

                    {permitDone && (
                      <div className="buttons-container">
                        <Button
                          variant="danger"
                          onClick={() => MoveTaskDoing()}
                        >
                          <AiOutlineArrowLeft />
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => MoveTaskToClose()}
                        >
                          <AiOutlineArrowRight />
                        </Button>
                      </div>
                    )}
                  </div>
                  //</Card>
                );
              }
            })}
          </div>

          <div>
            <div className="col-header">
              <p>CLOSE</p>
            </div>
            {tasks.map((task) => {
              if (task.task_state === "Closed") {
                return (
                  //<Card style={{ marginBottom: "10px" }} key={task.task_name}>
                  <div
                    style={{ marginBottom: "10px", color: "#DEE2E6" }}
                    key={task.task_name}
                  >
                    <Task
                      taskName={task.task_name}
                      taskDescription={task.task_description}
                      taskState={task.task_state}
                      taskOwner={task.task_owner}
                    />
                    <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                      <Button style={{ width: "100%" }}>
                        <AiFillEdit />
                      </Button>
                    </Link>
                  </div>
                  //</Card>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationKanban;
