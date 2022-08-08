import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";

const CreateTask = ({
  open,
  onHide,
  plans,
  data,
  now,
  time,
  taskCreator,
  taskOwner,
  fetchTasks,
  openAddTaskForm,
  closeAddTaskForm,
}) => {
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
    const value = selectedPlan.value;
    setTaskPlan(value);
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const app_acronym = data.app_acronym;
    const app_Rnum = data.app_Rnum;
    const permitCreate = data.app_permitCreate;
    console.log(permitCreate);
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
        permitUser: permitCreate,
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
    <Modal show={openAddTaskForm} onHide={closeAddTaskForm} size="lg" centered>
      <Form onSubmit={handleSubmit} className="editTask">
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
export default CreateTask;
