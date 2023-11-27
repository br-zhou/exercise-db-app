import React, { useState, useEffect } from "react";
import { serverPost } from "../../utils/api";
import NutritionCard from "./NutritionCard";
const NutritionPlan = (token) => { 
  const onLoad = async () => {
    const dummyData = await serverPost("POST", "nutrition-table", token);
    setData(dummyData);
    console.log(dummyData)
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

return (
    <div>
        <NutritionCard key={data[0][0]} carbs={data[0][1]} fats={data[0][2]} protein={data[0][3]} calories={data[0][4]}/>
    </div>
)
}

export default NutritionPlan;
