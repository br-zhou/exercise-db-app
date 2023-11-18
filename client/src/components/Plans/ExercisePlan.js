import { useEffect, useState } from "react";
import { serverFetch } from "../../utils/api";
import ExerciseCard from "./ExerciseCard";
const ExercisePlan = () => {
    const onLoad = async () => {
        const dummyData = await serverFetch("GET", "exercise-table");
        setData(dummyData);
        console.log(dummyData)
        // todo: get client data
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