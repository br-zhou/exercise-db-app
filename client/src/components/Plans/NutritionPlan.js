import React, { useState, useEffect } from "react";
import { serverFetch } from "../../utils/api";
import NutritionCard from "./NutritionCard";
const NutritionPlan = () => { 
  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "nutrition-table");
    setData(dummyData);
    console.log(dummyData)
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

return (
    <div>
      {data.map(row => 
        <NutritionCard key={row[0]} carbs={row[1]} fats={row[2]} protein={row[3]} calories={row[4]}/>)}
    </div>
)
}

export default NutritionPlan;
