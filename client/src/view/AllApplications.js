import axios from "axios";
import React, { useEffect, useState } from "react";
import Application from "./Application";

const AllApplications = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getApplications = async () => {
      const response = await axios.get("/get-applications");
      setData(response.data);
      console.log(response.data);
    };
    getApplications();
  }, []);

  return (
    <>
      {data.map((application) => {
        // const date = application.app_endDate.toString().slice(0, 10);
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
