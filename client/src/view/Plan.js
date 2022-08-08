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
      }}
    >
      {/* <span className="color-tag" style={{ backgroundColor: planColor, borderRadius: "15px" }}></span> */}
      <p style={{ color: planColor ? "#000000" : "#FFFFFF" }}>{planName}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          color: planColor ? "#000000" : "#FFFFFF",
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
