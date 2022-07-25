import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Application from "./Application";

const ApplicationKanban = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  console.log(param.app_acronym);

  const fetchApplication = async () => {
    const response = await axios.get("/get-application", {
      params: {
        app_acronym: param.app_acronym,
      },
    });
    console.log(response.data[0]);
    setData(response.data);
  };

  useEffect(() => {
    fetchApplication();
  }, []);
  return (
    <div>
      Kanban Board for {param.app_acronym}
      <div>
        {data.map(({ app_acronym, app_description }) => {
          <div key={app_acronym}>
            <p>hi</p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default ApplicationKanban;
