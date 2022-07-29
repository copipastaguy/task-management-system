import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FcClock } from "react-icons/fc";

const Application = ({
  acronym,
  description,
  rNum,
  start,
  end,
  open,
  editApp,
}) => {
  return (
    <Link to={`/tasks/${acronym}`}>
      <Card
        className="application"
        onClick={editApp}
        style={{ boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)" }}
      >
        <div>
          <h3>{acronym}</h3>
        </div>
        <div>
          <p>Description: {description}</p>
        </div>
        <div>
          <p>
            <FcClock /> {end}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default Application;
