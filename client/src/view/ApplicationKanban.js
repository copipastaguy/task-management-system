import axios from "axios";
import React, { useEffect, useState } from "react";
// import Select from "react-select";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Header from "./Header";

// MODALS
import CreateTask from "./Modal/CreateTask";
import EditApp from "./Modal/EditApp";
import CreatePlan from "./Modal/CreatePlan";
import ViewTask from "./Modal/ViewTask";

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

  const [openViewTask, setOpenViewTask] = useState(false);
  const openViewTaskForm = () => setOpenViewTask(true);
  const closeViewTaskForm = () => setOpenViewTask(false);

  const [projectLead, setProjectLead] = useState(false);
  const [projectManager, setProjectManager] = useState(false);

  const taskCreator = localStorage.getItem("username");
  const taskOwner = localStorage.getItem("username");

  const [permitOpen, setPermitOpen] = useState(false);
  const [permitTodo, setPermitTodo] = useState(false);
  const [permitDoing, setPermitDoing] = useState(false);
  const [permitDone, setPermitDone] = useState(false);

  const [openCount, setOpenCount] = useState(0);

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
    console.log(response.data);
    setTasks(response.data);

    const openTask = response.data.filter(
      (task) => task.task_state === "Open"
    ).length;
    setOpenCount(openTask);
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

        {openEdit && (
          <EditApp
            show={openEdit}
            onHide={closeEditForm}
            data={data}
            groups={groups}
            fetchApplication={fetchApplication}
            openEditForm={openEditForm}
            closeEditForm={closeEditForm}
            projectLead={projectLead}
          />
        )}
        {openAddPlan && (
          <CreatePlan
            show={openAddPlan}
            onHide={closeAddPlanForm}
            data={data}
            now={now}
            getPlans={getPlans}
            openAddPlanForm={openAddPlan}
            closeAddPlanForm={closeAddPlanForm}
          />
        )}

        {openAddTask && (
          <CreateTask
            show={openAddTask}
            onHide={closeAddTaskForm}
            plans={plans}
            data={data}
            now={now}
            time={time}
            taskCreator={taskCreator}
            taskOwner={taskOwner}
            fetchTasks={fetchTasks}
            openAddTaskForm={openAddTaskForm}
            closeAddTaskForm={closeAddTaskForm}
          />
        )}

        {openViewTask && (
          <ViewTask
            show={openViewTask}
            onHide={closeViewTaskForm}
            // data={data}
            groups={groups}
            openViewTaskForm={openViewTaskForm}
            closeViewTaskForm={closeViewTaskForm}
            // task_name={task_name}
          />
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
              <p>
                OPEN <span>{openCount}</span>
              </p>
            </div>
            <div>
              {/* {tasks
                .filter((task) => task.task_state === "Open")
                .map((task) => {
                  return <p>hi</p>;
                })} */}
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
                      <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
                        <Button
                          style={{ width: "100%" }}
                          onClick={openViewTaskForm}
                        >
                          <AiFillEye />
                        </Button>
                      </Link>

                      {permitOpen && (
                        <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                          <Button style={{ width: "100%" }}>
                            <AiFillEdit />
                          </Button>
                        </Link>
                      )}

                      {permitOpen && (
                        <div className="buttons-container">
                          <Button variant="success" onClick={approveTask}>
                            <AiFillCheckCircle />
                          </Button>
                        </div>
                      )}
                    </div>
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
                  return (
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

                      {permitTodo ? (
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
                      ) : (
                        <Link
                          to={`/tasks/${app_acronym}/view/${task.task_name}`}
                        >
                          <Button style={{ width: "100%" }}>
                            <AiFillEye />
                          </Button>
                        </Link>
                      )}
                    </div>
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

                      {permitDoing ? (
                        <>
                          <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                            <Button style={{ width: "100%" }}>
                              <AiFillEdit />
                            </Button>
                          </Link>
                          <div className="buttons-container">
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
                        </>
                      ) : (
                        <Link
                          to={`/tasks/${app_acronym}/view/${task.task_name}`}
                        >
                          <Button style={{ width: "100%" }}>
                            <AiFillEye />
                          </Button>
                        </Link>
                      )}
                    </div>
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
                    <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
                      <Button style={{ width: "100%" }}>
                        <AiFillEye />
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
