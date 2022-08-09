import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
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
  AiFillClockCircle,
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

  const lead = sessionStorage.getItem("isLead");
  const [projectLead, setProjectLead] = useState(lead);

  const manager = sessionStorage.getItem("isManager");
  const [projectManager, setProjectManager] = useState(manager);

  const taskCreator = sessionStorage.getItem("username");
  const taskOwner = sessionStorage.getItem("username");

  const [permitOpen, setPermitOpen] = useState(true);
  const [permitTodo, setPermitTodo] = useState(false);
  const [permitDoing, setPermitDoing] = useState(false);
  const [permitDone, setPermitDone] = useState(false);

  const [openCount, setOpenCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [doingCount, setDoingCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);

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
    // console.log(response.data[0]);
    setData(response.data[0]);
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

    const openTask = response.data.filter((task) => task.task_state === "Open").length;
    setOpenCount(openTask);

    const todoTask = response.data.filter((task) => task.task_state === "ToDo").length;
    setTodoCount(todoTask);

    const doingTask = response.data.filter((task) => task.task_state === "Doing").length;
    setDoingCount(doingTask);

    const doneTask = response.data.filter((task) => task.task_state === "Done").length;
    setDoneCount(doneTask);

    const closeTask = response.data.filter((task) => task.task_state === "Closed").length;
    setCloseCount(closeTask);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchApplication();
    getPlans();

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
          <h2 style={{ textAlign: "center", fontSize: "40px" }}>{data.app_acronym}</h2>

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

            {!projectLead && (
              <Button onClick={openEditForm}>
                <AiFillEye /> Application
              </Button>
            )}

            {projectLead && (
              <Button onClick={openEditForm}>
                <AiFillEdit /> Application
              </Button>
            )}

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
          <div className="app-info">
            <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
              <AiFillClockCircle /> {data.startDate}
              <AiFillClockCircle /> {data.endDate}
            </div>
          </div>
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
            taskOwner={taskOwner}
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
            groups={groups}
            openViewTaskForm={openViewTaskForm}
            closeViewTaskForm={closeViewTaskForm}
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
              <p>OPEN</p>
              <span>{openCount}</span>
            </div>
            <div>
              {tasks
                .filter((task) => task.task_state === "Open")
                .map((task) => {
                  const approveTask = async () => {
                    const newState = "ToDo";
                    const note = `${now} ${time}: ${newState} \n${taskCreator} \nTask has been approved`;
                    console.log(data.app_permitOpen);
                    try {
                      const response = await axios.post("/move-task-todo", {
                        task_name: task.task_name,
                        newState,
                        note,
                        taskOwner,
                        permitUser: data.app_permitOpen,
                      });

                      if (!response.data.error) {
                        toast.success(`Move ${task.task_name} to ToDo!`, {
                          position: "top-center",
                          autoClose: 700,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                        });
                        fetchTasks();
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
                    } catch (e) {
                      console.warn(e);
                    }
                  };
                  return (
                    <div style={{ marginBottom: "10px", color: "#DEE2E6" }} key={task.task_name}>
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                        taskColor={task.task_color}
                        taskPlan={task.task_plan}
                      />
                      {!permitOpen && (
                        <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
                          <Button style={{ width: "100%" }} onClick={openViewTaskForm}>
                            <AiFillEye />
                          </Button>
                        </Link>
                      )}

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
                })}
            </div>
          </div>

          <div>
            <div className="col-header">
              <p>TO-DO</p>
              <span>{todoCount}</span>
            </div>
            <div>
              {tasks
                .filter((task) => task.task_state === "ToDo")
                .map((task) => {
                  const MoveTaskToDoing = async () => {
                    const newState = "Doing";
                    const response = await axios.post("/move-task-doing", {
                      task_name: task.task_name,
                      newState,
                      taskOwner,
                      permitUser: data.app_permitTodo,
                    });
                    if (!response.data.error) {
                      toast.success(`Move ${task.task_name} to Doing!`, {
                        position: "top-center",
                        autoClose: 700,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                      });
                      fetchTasks();
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

                    fetchTasks();
                  };
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
                        taskColor={task.task_color}
                        taskPlan={task.task_plan}
                      />

                      <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                        <Button style={{ width: "100%" }}>
                          <AiFillEdit />
                        </Button>
                      </Link>

                      {/* {permitTodo ? (
                        <div>
                          <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                            <Button style={{ width: "100%" }}>
                              <AiFillEdit />
                            </Button>
                          </Link>
                          <Button style={{ width: "100%" }} variant="success" onClick={() => MoveTaskToDoing()}>
                            <AiOutlineArrowRight />
                          </Button>
                        </div>
                      ) : (
                        <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
                          <Button style={{ width: "100%" }}>
                            <AiFillEye />
                          </Button>
                        </Link>
                      )} */}
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            <div className="col-header">
              <p>DOING</p>
              <span>{doingCount}</span>
            </div>
            <div>
              {tasks.map((task) => {
                const MoveTaskToDone = async () => {
                  const newState = "Done";
                  const response = await axios.post("/move-task-done", {
                    task_name: task.task_name,
                    newState,
                    taskOwner,
                    permitUser: data.app_permitDoing,
                  });
                  if (!response.data.error) {
                    toast.success(`Move ${task.task_name} to Done!`, {
                      position: "top-center",
                      autoClose: 700,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                    fetchTasks();
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
                };
                const MoveTaskToDo = async () => {
                  const newState = "ToDo  ";
                  const response = await axios.post("/move-task-todo", {
                    task_name: task.task_name,
                    newState,
                    taskOwner,
                  });

                  if (!response.data.error) {
                    toast.success(`Move ${task.task_name} to To-Do!`, {
                      position: "top-center",
                      autoClose: 700,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                    fetchTasks();
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
                };
                if (task.task_state === "Doing") {
                  return (
                    <div style={{ marginBottom: "10px", color: "#DEE2E6" }} key={task.task_name}>
                      <Task
                        taskName={task.task_name}
                        taskDescription={task.task_description}
                        taskState={task.task_state}
                        taskOwner={task.task_owner}
                        taskColor={task.task_color}
                        taskPlan={task.task_plan}
                      />

                      {permitDoing ? (
                        <>
                          <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                            <Button style={{ width: "100%" }}>
                              <AiFillEdit />
                            </Button>
                          </Link>
                          <div className="buttons-container">
                            <Button variant="danger" onClick={() => MoveTaskToDo()}>
                              <AiOutlineArrowLeft />
                            </Button>

                            <Button variant="success" onClick={() => MoveTaskToDone()}>
                              <AiOutlineArrowRight />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
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
              <span>{doneCount}</span>
            </div>
            {tasks.map((task) => {
              const MoveTaskDoing = async () => {
                const newState = "Doing";
                const response = await axios.post("/move-task-doing", {
                  task_name: task.task_name,
                  newState,
                  taskOwner,
                  permitUser: data.app_permitDone,
                });
                if (!response.data.error) {
                  toast.success(`Move ${task.task_name} to Doing!`, {
                    position: "top-center",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                  });
                  fetchTasks();
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
              };
              const MoveTaskToClose = async () => {
                const newState = "Closed";
                const response = await axios.post("/move-task-close", {
                  task_name: task.task_name,
                  newState,
                  taskOwner,
                });
                if (!response.data.error) {
                  toast.success(`Move ${task.task_name} to Closed!`, {
                    position: "top-center",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                  });
                  fetchTasks();
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
              };

              if (task.task_state === "Done") {
                return (
                  <div style={{ marginBottom: "10px", color: "#DEE2E6" }} key={task.task_name}>
                    <Task
                      taskName={task.task_name}
                      taskDescription={task.task_description}
                      taskState={task.task_state}
                      taskOwner={task.task_owner}
                      taskColor={task.task_color}
                      taskPlan={task.task_plan}
                    />
                    <Link to={`/tasks/${app_acronym}/${task.task_name}`}>
                      <Button style={{ width: "100%" }}>
                        <AiFillEye />
                      </Button>
                    </Link>

                    {permitDone && (
                      <div className="buttons-container">
                        <Button variant="danger" onClick={() => MoveTaskDoing()}>
                          <AiOutlineArrowLeft />
                        </Button>
                        <Button variant="success" onClick={() => MoveTaskToClose()}>
                          <AiOutlineArrowRight />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>

          <div>
            <div className="col-header">
              <p>CLOSE</p>
              <span>{closeCount}</span>
            </div>
            {tasks.map((task) => {
              if (task.task_state === "Closed") {
                return (
                  <div style={{ marginBottom: "10px", color: "#DEE2E6" }} key={task.task_name}>
                    <Task
                      taskName={task.task_name}
                      taskDescription={task.task_description}
                      taskState={task.task_state}
                      taskOwner={task.task_owner}
                      taskColor={task.task_color}
                      taskPlan={task.task_plan}
                    />
                    <Link to={`/tasks/${app_acronym}/view/${task.task_name}`}>
                      <Button style={{ width: "100%" }}>
                        <AiFillEye />
                      </Button>
                    </Link>
                  </div>
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
