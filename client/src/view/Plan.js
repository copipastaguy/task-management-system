import React from "react";
import Card from "react-bootstrap/Card";

const Plan = ({ planName, startDate, endDate }) => {
  return (
    <Card className="application">
      <p>MVP: {planName}</p>
      <p>start: {startDate}</p>
      <p>end: {endDate}</p>
    </Card>
  );
};

export default Plan;
