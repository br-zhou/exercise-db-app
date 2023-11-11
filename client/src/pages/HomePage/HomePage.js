import React, { useState } from "react";
import GoalCard from "../../components/GoalCard/GoalCard";
import FormGoalButton from "../../components/FormGoalButton/FormGoalButton";

const HomePage = () => {
  const [goals, setGoals] = useState([
    {
      gid: 1,
      category: "w",
      weight: "23",
      date: "112312"
    },
    {
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
    },
    {
      gid: 4,
      category: "k",
      weight: "435",
      date: "24"
    },
    {
      gid: 5,
      category: "fdn",
      weight: "342345",
      date: "242043"
    }
  ]);

  const addGoal = (newGoal) => {
    // Check if the newGoal is already in the goals array
    if (!goals.some((goal) => goal.gid === newGoal.gid)) {
    //  setGoals([...goals, newGoal]);
    }
  };
  const closeForm = () => {
    // Define your logic for closing the form here
    console.log("Closing form");
  };

  return (
    <div>
      <div className="mt-8 text-3xl font-bold underline text-center">
        HOME PAGE
      </div>
      {/* FormGoalButton component with inline styles */}
      <div>
        <FormGoalButton onSubmit={addGoal}  closeFormGoalButton={closeForm} setGoals={setGoals}/>
      </div>

      <div className="mt-8 text-3xl font-bold underline text-center">
        Your current goals!
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap", // Allows cards to wrap to the next row
          justifyContent: "center",
          width: "100%"
        }}
      >
        {goals.map((item) => (
          <div
            key={item.gid}
            style={{
              margin: "10px", // Adjust the margin between the cards
              width: "calc(33.33% - 20px)", // Set the width to fit 3 cards in a row with margins
              maxWidth: "300px" // Set a maximum width for each card if needed
            }}
          >
            <GoalCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;



