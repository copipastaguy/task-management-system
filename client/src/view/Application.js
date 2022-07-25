import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
    <Card className="application" onClick={editApp}>
      <div>
        <h3>{acronym}</h3>
      </div>
      <div>
        <p>Description: {description}</p>
      </div>
      <div>
        <p>Running Num: {rNum}</p>
      </div>
      <div>
        <p>Permited by: {open}</p>
      </div>
    </Card>
  );
};

export default Application;
