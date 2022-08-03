import React from "react";
import Plan from "./Plan";

const AllPlans = ({ plans }) => {
  return (
    <>
      {plans.map((plan) => {
        return (
          <div key={plan.plan_mvp_name}>
            <Plan
              // planColor={}
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
