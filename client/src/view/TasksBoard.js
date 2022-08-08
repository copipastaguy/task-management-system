import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CreateApp from "./Modal/CreateApp";
import AllApplications from "./AllApplications";

const TasksBoard = () => {
  // sessionStorage USERNAME
  const user = sessionStorage.getItem("username");
  const [groups, setGroups] = useState([]);

  const [projectlead, setProjectLead] = useState(false);

  const [applications, setApplications] = useState([]);

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const openCreateApp = () => setOpenCreateForm(true);
  const closeCreateApp = () => setOpenCreateForm(false);

  const getApplications = async () => {
    const response = await axios.get("/get-applications");
    setApplications(response.data);
  };

  const getGroups = async () => {
    const response = await axios.get("/user-groups");
    setGroups(response.data);
  };

  useEffect(() => {
    getApplications();
    getGroups();

    const lead = sessionStorage.getItem("isLead");
    if (lead === "true") {
      setProjectLead(true);
    }
  }, []);

  return (
    <div className="main-container tasks-board">
      <h3 style={{ color: "white" }}>Applications</h3>
      {projectlead && (
        <div>
          <Button onClick={openCreateApp}>Create new App</Button>
          <CreateApp
            show={openCreateForm}
            onHide={closeCreateApp}
            groups={groups}
            getApplications={getApplications}
            openCreateForm={openCreateForm}
            closeCreateApp={closeCreateApp}
          />
        </div>
      )}

      <div className="application-container">
        <AllApplications data={applications} />
      </div>

      <div className="tasks-container"></div>
    </div>
  );
};

export default TasksBoard;
