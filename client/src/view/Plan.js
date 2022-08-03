import React from "react";
import Card from "react-bootstrap/Card";
import { AiFillFlag } from "react-icons/ai";
import { FcClock } from "react-icons/fc";

const Plan = ({ planName, startDate, endDate, planColor }) => {
  return (
    <Card
      className="application"
      style={{
        height: "150px",
        width: "250px",
        boxShadow: "7px 7px 8px -6px rgba(87,87,87,0.8)",
        borderRadius: "15px",
        gap: "10px",
      }}
    >
      <span
        className="color-tag"
        style={{ backgroundColor: { planColor } }}
      ></span>
      <h3>{planName}</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <p>
          <FcClock />
        </p>
        <p>{endDate}</p>
      </div>
    </Card>
  );
};

export default Plan;
