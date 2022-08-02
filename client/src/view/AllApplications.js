import axios from "axios";
import React, { useEffect, useState } from "react";
import Application from "./Application";

const AllApplications = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getApplications = async () => {
      const response = await axios.get("/get-applications");
      setData(response.data[0]);
      // console.log(response.data[0]);
    };
    getApplications();
  }, []);

  return (
    <>
      {data.map((application) => {
        return (
          <div key={application.app_acronym}>
            <Application
              acronym={application.app_acronym}
              description={application.app_description}
              rNum={application.app_Rnum}
              open={application.app_permitOpen}
              end={application.endDate}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllApplications;
