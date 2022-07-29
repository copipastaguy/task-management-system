import React from "react";
import Card from "react-bootstrap/Card";

const Task = ({
  taskName,
  taskState,
  taskPlan,
  taskDescription,
  taskOwner,
}) => {
  return (
    <Card
      className="application"
      style={{
        height: "150px",
        width: "250px",
        boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)",
        borderRadius: "15px",
      }}
    >
      <div>
        <h2>{taskName}</h2>
      </div>

      <div>
        <p>{taskDescription}</p>
      </div>

      <div>
        <p>{taskOwner}</p>
      </div>
    </Card>
  );
};

export default Task;
