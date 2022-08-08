import React from "react";
import Card from "react-bootstrap/Card";
import { CgProfile } from "react-icons/cg";

const Task = ({ taskName, taskState, taskPlan, taskDescription, taskOwner, taskCreator, taskColor }) => {
  return (
    <Card
      className="task"
      style={{
        height: "130px",
        width: "250px",
        boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)",
        backgroundColor: "#343A40",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "200px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            borderRadius: "20px",
            backgroundColor: taskColor,
            width: "20px",
            height: "20px",
            textAlign: "center",
          }}
        ></span>
        <p style={{ margin: 0 }}>{taskPlan}</p>
      </div>

      <div>
        <p style={{ fontWeight: "600" }}>{taskName}</p>
      </div>

      <div>
        <p style={{ fontSize: "12px" }}>{taskDescription}</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <p>
          <CgProfile />
        </p>
        {taskOwner}
      </div>
    </Card>
  );
};

export default Task;
