import axios from "axios";
import React, { useEffect, useState } from "react";

const Applications = ({ acronym, description, start, end, open, editApp }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchApplication = async () => {
  //     const response = await axios.get("/applications");
  //     setData(response.data);
  //   };
  //   fetchApplication();
  // }, []);

  return (
    <div className="application" onClick={editApp}>
      <p>App: {acronym}</p>
      <p>Permited by: {open}</p>
      <p></p>
    </div>
  );
};

export default Applications;
