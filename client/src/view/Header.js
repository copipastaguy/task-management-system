import React from "react";
import NavBar from "./NavBar";

const Header = () => {
  const user = localStorage.getItem("username");
  return (
    <div className="header">
      {/* <NavBar /> */}
      <h2>Welcome: {user}</h2>
      <a href="/" className="signOut">
        <h2>Sign out</h2>
      </a>
    </div>
  );
};

export default Header;
