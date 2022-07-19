import e from "cors";
import React, { useState } from "react";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserUpdate from "./UserUpdate";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = localStorage.getItem("username");

  const [displayUpdate, setDisplayUpdate] = useState(false);
  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();
    console.log("sign out");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      {/* <NavBar /> */}
      <h2>Welcome: {user}</h2>

      <Button onClick={handleSignout}>Sign out</Button>
      <Button onClick={setDisplayUpdate}>Update Details</Button>

      {displayUpdate && (
        <>
          <UserUpdate />
          <Button
            className="closeBtn btn-danger"
            onClick={() => setDisplayUpdate(!displayUpdate)}
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};

export default Header;
