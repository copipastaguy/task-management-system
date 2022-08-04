import React from "react";
import Application from "./Application";

const AllApplications = ({ data }) => {
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
