import React, { useState } from "react";
import GoalCard from "../../components/GoalCard/GoalCard";
import FormGoalButton from "../../FormGoalButton/FormGoalButton";

const HomePage = () => {
  const DATA = [{
    gid: 1,
    category: "w",
    weight: "23",
    date: "112312"
  },{
    gid: 2,
    category: "p",
    weight: "45",
    date: "12434"
  },
  {
    gid: 3,
    category: "w",
    weight: "64",
    date: "24324"
  }]

  const foo = (data) => {
    return <GoalCard />
  }

  return (
    <>
     
      <div className="mt-8 text-3xl font-bold underline text-center">HOME PAGE</div>
      {/* FormGoalButton component with inline styles */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 50
        }}
      >
        <FormGoalButton />
      </div>

      {/* GoalCard components with inline styles */}
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {DATA.map(item => (
          <GoalCard
            key={item.gid}
            {...item}
            style={{ margin: "10px", maxWidth: "300px", width: "100%" }}
          />
        ))}
      </div>
     
  
      <input type="checkbox" data-role="checkbox" data-caption="Indeterminate" data-indeterminate="true" />
  
      <input type="checkbox" data-role="checkbox" data-caption="Indeterminate" data-indeterminate="true" data-style="2" />
      
     
      
    </>
  );
  
};

export default HomePage;


