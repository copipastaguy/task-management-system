import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";

// ALL OPEN TASKS
const AllTodoTasks = () => {
  const [data, setData] = useState([]);

  const fetchTodo = async () => {
    const response = await axios.get("/get-todo");
    setData(response.data);
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  console.log(data);

  return (
    <>
      {data.map((todo) => {
        return (
          <div key={todo.task_name}>
            <Task
              taskName={todo.task_name}
              taskDescription={todo.task_description}
              taskState={todo.task_state}
              taskOwner={todo.task_owner}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllTodoTasks;
