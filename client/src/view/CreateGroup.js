import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const CreateGroup = () => {
  const [groupname, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(groupname);
    console.log("adding new group . . .");

    try {
      const response = await axios.post("/add-group", {
        groupname,
      });
      console.log(response);
      if (!response.data.error) {
        toast.success(`Added ${groupname} to user groups`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setGroupName("");
      }
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setGroupName("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="main-container">
      <ToastContainer />

      <Form onSubmit={handleSubmit} className="add-form add-group form">
        <h3>ADD USER GROUP</h3>

        <Form.Group>
          <Form.Label>User group name</Form.Label>
          <Form.Control
            // required
            type="text"
            // placeholder="groupname"
            value={groupname}
            id="groupname"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>

        <Button className="submitButton" variant="success" type="submit">
          Add new user group
        </Button>

        <Button
          className="submitButton"
          variant="danger"
          onClick={() => alert("close")}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default CreateGroup;
