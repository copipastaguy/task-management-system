import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import axios from "axios";

const ViewTask = ({
  show,
  onHide,
  groups,
  openViewTaskForm,
  closeViewTaskForm,
  // auditNotes,
  selectedPlan,
  taskNotes,
  //   task_name,
}) => {
  const [auditNotes, setAuditNotes] = useState([]);
  const [data, setData] = useState([]);

  const { task_name } = useParams();
  const navigate = useNavigate();
  console.log(task_name);

  const fetchTask = async () => {
    const response = await axios.get("/get-task", {
      params: {
        task_name,
      },
    });
    console.log(response);
    setData(response.data[0]);

    // GET AUDIT NOTES
    const notes = await axios.get("/get-task-notes", {
      params: {
        task_name,
      },
    });
    setAuditNotes(notes.data);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  //   const options = groups.map((group) => {
  //     const value = group.groupname;
  //     return {
  //       label: value,
  //       value: value,
  //     };
  //   });

  return (
    <Form className="updateTask">
      <Modal.Header>
        <Modal.Title className="taskTitle">{data.task_name}</Modal.Title>
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
              rows={5}
              id="app_description"
              value={data.task_description}
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
                rows={7}
                id="app_notes"
                value={taskNotes}
                readOnly
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
                //   options={options}
                name="task_plan"
                value={selectedPlan}
                getOptionValue={(option) => option.value}
                isDisabled
                styles={{ color: "black" }}
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
        </Row>
      </Modal.Body>
    </Form>
  );
};
export default ViewTask;
