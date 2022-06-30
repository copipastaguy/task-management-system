import React from "react";

const NavBar = () => {
  const pages = ["view users", "add users"];
  return (
    <div className="navigation">
      <div className="menuIcon">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="menu">
        {pages.map((page) => {
            return <p key={ page}>{page}</p>;
        })}
      </div>
    </div>
  );
};

export default NavBar;
