import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";

// ALL OPEN TASKS
const AllOpenTasks = () => {
  const [data, setData] = useState([]);

  const fetchOpen = async () => {
    const response = await axios.get("/get-open");
    setData(response.data);
  };

  useEffect(() => {
    fetchOpen();
  }, [data]);
  return (
    <>
      {data.map((open) => {
        return (
          <div key={open.task_name}>
            <Task
              taskName={open.task_name}
              taskDescription={open.task_description}
              taskState={open.task_state}
              taskOwner={open.task_owner}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllOpenTasks;
