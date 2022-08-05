import React from "react";
import Card from "react-bootstrap/Card";

import { FcClock } from "react-icons/fc";

const Plan = ({ planName, startDate, endDate, planColor }) => {
  return (
    <Card
      className="application"
      style={{
        height: "100px",
        width: "210px",
        boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)",
        borderRadius: "15px",
        backgroundColor: planColor,
        // gap: "5px",
      }}
    >
      <p style={{ color: !planColor && "#000000" }}>{planName}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          color: "black",
        }}
      >
        <p>
          <FcClock />
        </p>
        <p>{endDate}</p>
      </div>
    </Card>
  );
};

export default Plan;
