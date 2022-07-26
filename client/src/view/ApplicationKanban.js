import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Application from "./Application";

const ApplicationKanban = () => {
  const param = useParams();
  const [data, setData] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const openEditForm = () => setOpenEdit(true);
  const closeEditForm = () => setOpenEdit(false);

  const fetchApplication = async () => {
    const response = await axios.get("/get-application", {
      params: {
        app_acronym: param.app_acronym,
      },
    });
    console.log(response.data);
    setData(response.data[0]);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const EditForm = ({ show, onHide }) => {
    const app_acronym = data.app_acronym;
    const app_Rnum = data.app_Rnum;
    const app_description = data.app_description;
    const [app_startDate, setStartDate] = useState(data.app_startDate);
    const [app_endDate, setEndDate] = useState(data.app_endDate);

    const [permitOpen, setPermitOpen] = useState();
    const [permitTodo, setPermitTodo] = useState();
    const [permitDoing, setPermitDoing] = useState();
    const [permitDone, setPermitDone] = useState();

    console.log(app_startDate);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // const response = await axios.put("/update-application", {});
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
                    value={app_acronym}
                    id="app_name"
                    // onChange={(e) => setAppAcronym(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={4}>
                <Form.Group>
                  <Form.Label>Running Number</Form.Label>

                  <Form.Control
                    type="number"
                    readOnly
                    value={app_Rnum}
                    // onChange={(e) => setAppRnum(e.target.value)}
                  />
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
                  placeholder="Description"
                  value={app_description}
                  id="app_description"
                  // onChange={(e) => setAppDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group as={Col}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  autoFocus
                  type="date"
                  value={app_startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={app_endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />

            <Row>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Open</Form.Label>
                {/* <Select
                  options={options}
                  name="permit_open"
                  value={selectedOpen}
                  onChange={handlePermitOpen}
                  getOptionValue={(option) => option.value}
                /> */}
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit ToDo</Form.Label>
                {/* <Select options={options} name="permit_open" /> */}
              </Form.Group>

              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Doing</Form.Label>
                {/* <Select options={options} name="permit_open" /> */}
              </Form.Group>
              <Form.Group style={{ width: "400px" }} as={Col}>
                <Form.Label>Permit Done</Form.Label>
                {/* <Select options={options} name="permit_open" /> */}
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

  return (
    <div>
      <h2>Kanban Board for: {param.app_acronym}</h2>
      <div>
        <Button onClick={openEditForm}>Update Application</Button>
        {openEdit && <EditForm show={openEdit} onHide={closeEditForm} />}
        {/* <EditForm show={openEdit} onHide={closeEditForm} /> */}

        <div className="tasks-container">
          <div>
            <h3>Plan</h3>
          </div>

          <div>
            <h3>Open</h3>
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
