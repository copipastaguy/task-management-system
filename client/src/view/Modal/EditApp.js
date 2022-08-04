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

const EditApp = ({
  show,
  onHide,
  data,
  groups,
  fetchApplication,
  openEditForm,
  closeEditForm,
  projectLead,
}) => {
  const app_acronym = data.app_acronym;
  const app_Rnum = data.app_Rnum;
  const app_description = data.app_description;
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDate] = useState(data.endDate);

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
export default EditApp;
