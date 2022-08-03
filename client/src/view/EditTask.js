import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useApi } from "../utils/useApi";

const EditTask = () => {
  const { task_name, app_acronym } = useParams();
  const navigate = useNavigate();

  const taskOwner = localStorage.getItem("username");

  const [data, setData] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState();
  const [taskNotes, setTaskNotes] = useState("");

  const [auditNotes, setAuditNotes] = useState([]);

  const [taskState, setTaskState] = useState("");
  const [taskPlan, setTaskPlan] = useState();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchTask = async () => {
    const response = await axios.get("/get-task", {
      params: {
        task_name,
      },
    });
    setData(response.data[0]);

    // GET AUDIT NOTES
    const notes = await axios.get("/get-task-notes", {
      params: {
        task_name,
      },
    });
    setAuditNotes(notes.data);
  };

  // FETCH PLANS ASSOCIATED WITH APPLICATION
  const fetchPlans = async () => {
    const plans = await axios.get("/get-plans", {
      params: {
        plan_app_acronym: app_acronym,
      },
    });
    setPlans(plans.data);
  };

  const options = plans.map((plan) => {
    const value = plan.plan_mvp_name;
    return {
      label: value,
      value: value,
    };
  });

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleTaskPlan = (selectedPlan) => {
    setSelectedPlan(selectedPlan);
    const value = selectedPlan.value;
    setTaskPlan(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/edit-task", {
        task_name,
        taskNotes,
        taskState: data.task_state,
        taskOwner,
        taskPlan,
      });
      if (response.data) {
        toast.success(response.data, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        fetchTask();
        setTaskNotes("");
        setSelectedPlan(null);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "65%", margin: "2% auto" }}>
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
              <Form.Label>Task state</Form.Label>
              <Form.Control defaultValue={data.task_state} readOnly />
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

              <Form.Control
                as="textarea"
                type="text"
                readOnly
                rows={7}
                id="app_notes"
                defaultValue={auditNotes}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Task notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                id="app_notes"
                value={taskNotes}
                onChange={(e) => setTaskNotes(e.target.value)}
                readOnly={
                  data.task_state === "Closed" ||
                  data.task_state === "Done" ||
                  (data.task_state === "Open" &&
                    taskOwner != data.task_creator &&
                    true)
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Assign a Plan</Form.Label>
              <p>Current plan assigned: {data.task_plan}</p>
              <Select
                options={options}
                name="task_plan"
                value={selectedPlan}
                onChange={handleTaskPlan}
                getOptionValue={(option) => option.value}
                isDisabled={
                  data.task_state === "Closed" ||
                  (taskOwner != data.task_creator && true)
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <br />

        <Row>
          <p>Created by: {data.task_creator}</p>
        </Row>

        <Row>
          <Col>
            <Button className="btn-danger" xs={4} onClick={() => navigate(-1)}>
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
