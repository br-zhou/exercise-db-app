import { useEffect, useState } from "react";
import { serverPost } from "../../utils/api";
import ExerciseCard from "./ExerciseCard";
const ExercisePlan = (token) => {
    const onLoad = async () => {
        const dummyData = await serverPost("POST", "exerciseplan-table", token);
        setData(dummyData);
        console.log(dummyData)
      };
    
      useEffect(() => {
        onLoad();
      }, []);

      const [data, setData] = useState([]);

    return (
        <div>
        {data.map(row => {
            return <ExerciseCard key={row[0]} name={row[1]} type={row[2]} />
          })}
          </div>
    )
}

export default ExercisePlan;