import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "@mui/material/Modal";

const ModalForm = ({ open, handleClose, label,  }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Form>
        <Form.Group>
          <Form.Label>{label}</Form.Label>
        </Form.Group>
      </Form>
    </Modal>
  );
};

export default ModalForm;
