import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import AllPlans from "./AllPlans";
import Plan from "./Plan";

const ApplicationKanban = () => {
  const param = useParams();

  const [data, setData] = useState([]);
  const [plan, setPlan] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const openEditForm = () => setOpenEdit(true);
  const closeEditForm = () => setOpenEdit(false);

  const [openAddPlan, setOpenAddPlan] = useState(false);
  const openAddPlanForm = () => setOpenAddPlan(true);
  const closeAddPlanForm = () => setOpenAddPlan(false);

  const [openAddTask, setOpenAddTask] = useState(false);
  const openAddTaskForm = () => setOpenAddTask(true);
  const closeAddTaskForm = () => setOpenAddTask(false);

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
  useEffect(() => {
    fetchApplication();
    getPlans();
  }, []);

  const EditApp = ({ show, onHide }) => {
    const app_acronym = data.app_acronym;
    console.log(app_acronym);
    const app_Rnum = data.app_Rnum;
    const app_description = data.app_description;
    const [startDate, setStartDate] = useState(data.app_startDate);
    const [endDate, setEndDate] = useState(data.app_endDate);

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

    useEffect(() => {
      setStartDate(new Date(data.app_startDate).toISOString().split("T")[0]);
      // moment(data.app_startDate).format("YYYY-MM-DD");
      // moment(data.app_startDate).add(1, "day").format("yyyy-MM-dd");
      setEndDate(new Date(data.app_endDate).toISOString().split("T")[0]);
      // setStartDate(moment(data.app_startDate).format("DD-MM-YYYY"));
    }, []);

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
        // console.log(response);

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

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/add-task", {
          taskName,
          taskDescription,
        });
        console.log(response);
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
            {/* <Modal.Title>Update application: {app_acronym}</Modal.Title> */}
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
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group>
                <Form.Label>Existing notes</Form.Label>
                <Form.Control readOnly rows={3} id="app_description" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Task notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  // placeholder={app_description}
                  id="app_description"
                />
              </Form.Group>
            </Row>
            <br />

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
    <div>
      <h2>Kanban Board for: {param.app_acronym}</h2>
      <div>
        <Button onClick={openEditForm}>Update Application</Button>
        {openEdit && <EditApp show={openEdit} onHide={closeEditForm} />}

        <div className="tasks-container">
          <div className="plans">
            <h3>Plan</h3>
            <div>
              <Button onClick={openAddPlanForm}>Add Plan</Button>
              {openAddPlan && (
                <CreatePlan show={openAddPlan} onHide={closeAddPlanForm} />
              )}
            </div>
            <AllPlans />
          </div>

          <div>
            <h3>Open</h3>
            <div>
              <Button onClick={openAddTaskForm}>Add tasks</Button>
              {openAddTask && (
                <CreateTask show={openAddTask} onHide={closeAddTaskForm} />
              )}
            </div>
          </div>

          <div>
            <h3>To-Do</h3>
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
