import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateApp = ({ show, onHide, groups, getApplications, openCreateForm, closeCreateApp }) => {
  const [app_acronym, setAppAcronym] = useState("");
  const [app_Rnum, setAppRnum] = useState("");
  const [app_description, setAppDescription] = useState("");
  const [app_startDate, setStartDate] = useState();
  const [app_endDate, setEndDate] = useState();

  const [permitCreate, setPermitCreate] = useState();
  const [permitOpen, setPermitOpen] = useState();
  const [permitTodo, setPermitTodo] = useState();
  const [permitDoing, setPermitDoing] = useState();
  const [permitDone, setPermitDone] = useState();

  const [selectedCreate, setSelectedCreate] = useState();
  const [selectedOpen, setSelectedOpen] = useState();
  const [selectedTodo, setSelectedTodo] = useState();
  const [selectedDoing, setSelectedDoing] = useState();
  const [selectedDone, setSelectedDone] = useState();

  const options = groups.map((group) => {
    const value = group.groupname;
    return {
      label: value,
      value: value,
    };
  });

  const handlePermitCreate = (selectedCreate) => {
    const value = selectedCreate.value;
    setPermitCreate(value);
  };

  const handlePermitOpen = (selectedOpen) => {
    const value = selectedOpen.value;
    setPermitOpen(value);
  };

  const handlePermitToDo = (selectedTodo) => {
    const value = selectedTodo.value;
    setPermitTodo(value);
  };

  const handlePermitDoing = (selectedDoing) => {
    const value = selectedDoing.value;
    setPermitDoing(value);
  };

  const handlePermitDone = (selectedDone) => {
    const value = selectedDone.value;
    setPermitDone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ///////////////////// ADD APPLICATION /////////////////////////////
      const response = await axios.post("/add-application", {
        app_acronym,
        app_description,
        app_Rnum,
        app_startDate,
        app_endDate,
        permitCreate,
        permitOpen,
        permitTodo,
        permitDoing,
        permitDone,
        token: sessionStorage.getItem("jwtToken"),
      });
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });
        getApplications();
      } else if (!response.data.error) {
        getApplications();
        toast.success(`Added ${app_acronym}!`, {
          position: "top-center",
          autoClose: 700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
        });

        // RESET FIELDS
        setAppAcronym("");
        setAppDescription("");
        setAppRnum();
        setSelectedCreate(null);
        setSelectedOpen(null);
        setSelectedTodo(null);
        setSelectedDoing(null);
        setSelectedDoing(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      show={openCreateForm}
      onHide={closeCreateApp}
      size="xl"
      centered
      style={{ margin: "auto", border: "1px solid" }}
    >
      <Form
        className=""
        onSubmit={handleSubmit}
        style={{
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Modal.Header>
          <Modal.Title>Create new app</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>
                  App name <span>(required)</span>
                </Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Application"
                  value={app_acronym}
                  id="app_name"
                  onChange={(e) => setAppAcronym(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={4}>
              <Form.Group>
                <Form.Label>
                  Running Number <span>(required)</span>
                </Form.Label>

                <Form.Control
                  type="number"
                  value={app_Rnum}
                  // readOnly={rNum > 0 ? true : false}
                  onChange={(e) => setAppRnum(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />

          <Row>
            <Form.Group>
              <Form.Label>
                Description <span>(required)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={app_description}
                id="app_description"
                onChange={(e) => setAppDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <br />

          <Row>
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={app_startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={app_endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>
          </Row>
          <br />

          <Row>
            <Form.Group style={{ width: "400px" }} as={Col}>
              <Form.Label>Permit Create</Form.Label>
              <Select
                options={options}
                name="permit_create"
                value={selectedCreate}
                onChange={handlePermitCreate}
                getOptionValue={(option) => option.value}
              />
            </Form.Group>

            <Form.Group style={{ width: "400px" }} as={Col}>
              <Form.Label>Permit Open</Form.Label>
              <Select
                options={options}
                name="permit_open"
                value={selectedOpen}
                onChange={handlePermitOpen}
                getOptionValue={(option) => option.value}
              />
            </Form.Group>

            <Form.Group style={{ width: "400px" }} as={Col}>
              <Form.Label>Permit ToDo</Form.Label>
              <Select
                options={options}
                name="permit_todo"
                onChange={handlePermitToDo}
                value={selectedTodo}
                getOptionValue={(option) => option.value}
              />
            </Form.Group>

            <Form.Group style={{ width: "400px" }} as={Col}>
              <Form.Label>Permit Doing</Form.Label>
              <Select
                options={options}
                name="permit_doing"
                onChange={handlePermitDoing}
                value={selectedDoing}
                getOptionValue={(option) => option.value}
              />
            </Form.Group>
            <Form.Group style={{ width: "400px" }} as={Col}>
              <Form.Label>Permit Done</Form.Label>
              <Select
                options={options}
                name="permit_done"
                onChange={handlePermitDone}
                value={selectedDone}
                getOptionValue={(option) => option.value}
              />
            </Form.Group>
          </Row>
          <br />

          <Row>
            <Col>
              <Button className="btn-success" type="submit" xs={4}>
                Create new App
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
export default CreateApp;
