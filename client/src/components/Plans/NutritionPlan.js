import React, { useState, useEffect } from "react";
import { serverPost } from "../../utils/api";
import NutritionCard from "./NutritionCard";
const NutritionPlan = (token) => { 
  let dummyData = [];
  const onLoad = async () => {
    dummyData = await serverPost("POST", "nutrition-table", token);
    console.log(dummyData);
    setData(dummyData);
    };

  const [data, setData] = useState();

  useEffect(() => {
    onLoad();

  }, []);

if (data === undefined) {
  return <div>Still Loading ...</div>
}

return (
    <div>
        <NutritionCard key={data[0][0]} carbs={data[0][1]} fats={data[0][2]} protein={data[0][3]} calories={data[0][4]}/>
    </div>
)
}

export default NutritionPlan;
