import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

const CreatePlan = ({
  open,
  onHide,
  data,
  now,
  getPlans,
  openAddPlanForm,
  closeAddPlanForm,
}) => {
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
    <Modal show={openAddPlanForm} onHide={closeAddPlanForm} size="lg" centered>
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
export default CreatePlan;
