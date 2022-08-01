import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Select from "react-select";

const EditTask = () => {
  const { task_name } = useParams();
  const navigate = useNavigate();
  const taskCreator = localStorage.getItem("username");

  const [data, setData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  // const [taskState, setTaskState] = useState("Open");
  // const [taskPlan, setTaskPlan] = useState();

  // const [selectedState, setSelectedState] = useState();
  // const [selectedPlan, setSelectedPlan] = useState();

  const fetchTask = async () => {
    const response = await axios.get("/get-task", {
      params: {
        task_name,
      },
    });
    setData(response.data[0]);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("/edit-task", {
      //   params: {
      //     task_name,
      //   },
      // });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "70%", margin: "5% auto" }}>
      <Modal.Header>
        <Modal.Title>Update: {task_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Task name</Form.Label>
              <Form.Control
                type="text"
                id="app_name"
                defaultValue={data.task_name}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Task name</Form.Label>
              <Form.Control defaultValue={data.task_state} readOnly />
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
              id="app_description"
              value={data.task_description}
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
          <Col>
            <Form.Group>
              <Form.Label>Assign a Plan</Form.Label>
              <Select
                // options={availPlans}
                name="task_plan"
                // value={data.task_plan}
                // onChange={handleTaskPlan}
                // getOptionValue={(option) => option.value}
              />
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <p>Created by: {taskCreator}</p>
        </Row>

        <Row>
          <Col>
            <Button
              className="btn-danger"
              type="submit"
              xs={4}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button className="btn-success" type="submit" xs={4}>
              Update task
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Form>
  );
};

export default EditTask;
