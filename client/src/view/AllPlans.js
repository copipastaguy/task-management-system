import React, { useState, useEffect } from "react";
import Plan from "./Plan";
import axios from "axios";
import { useParams } from "react-router-dom";

const AllPlans = () => {
  const [data, setData] = useState([]);
  const param = useParams();

  const getPlans = async () => {
    const response = await axios.get("/get-plans", {
      params: {
        plan_app_acronym: param.app_acronym,
      },
    });
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      {data.map((plan) => {
        return (
          <div key={plan.plan_mvp_name}>
            <Plan
              planName={plan.plan_mvp_name}
              startDate={plan.startDate}
              endDate={plan.endDate}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllPlans;
