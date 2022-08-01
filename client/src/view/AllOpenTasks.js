import React from "react";
import Task from "./Task";
import Button from "react-bootstrap/esm/Button";

// ALL OPEN TASKS
const AllOpenTasks = ({ openTasks }) => {
  return (
    <>
      {openTasks.map((openTask) => {
        return (
          <div key={openTask.task_name}>
            <Task
              taskName={openTask.task_name}
              taskDescription={openTask.task_description}
              taskState={openTask.task_state}
              taskOwner={openTask.task_owner}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllOpenTasks;
