import React from "react";
import Card from "react-bootstrap/Card";
import { CgProfile } from "react-icons/cg";

const Task = ({
  taskName,
  taskState,
  taskPlan,
  taskDescription,
  taskOwner,
  taskCreator,
}) => {
  return (
    <Card
      className="task"
      style={{
        height: "100px",
        width: "250px",
        boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)",
        backgroundColor: "#343A40",
        // borderRadius: "10px",
      }}
    >
      <div>
        {taskPlan}
        <p>{taskName}</p>
      </div>

      <div>
        <p>{taskDescription}</p>
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
