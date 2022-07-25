import React from "react";

const Task = ({ acronym, name, description }) => {
  return (
    <li>
      <p>Task acronym: {acronym}</p>
      <p>Task description: {description}</p>
    </li>
  );
};

export default Task;
