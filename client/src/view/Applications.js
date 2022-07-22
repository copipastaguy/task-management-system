import axios from "axios";
import React, { useEffect, useState } from "react";

const Applications = ({ acronym, description, start, end }) => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const fetchApplication = async () => {
  //       const response = await axios.get("/applications");
  //       setData(response.data);
  //     };
  //     fetchApplication();
  //   }, []);

  return (
    <div className="application">
      <p>{acronym}</p>
      <p>{description}</p>
      <p></p>
    </div>
  );
};

export default Applications;
