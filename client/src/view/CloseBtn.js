import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const CloseBtn = ({ handleCreate }) => {
  return (
    <Button
      className="submitButton"
      variant="danger"
      onClick={(e) => handleCreate(e)}
    >
      Cancel
    </Button>
  );
};

export default CloseBtn;
