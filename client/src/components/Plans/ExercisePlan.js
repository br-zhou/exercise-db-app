import { useEffect, useState } from "react";
import { serverPost } from "../../utils/api";
import ExerciseCard from "./ExerciseCard";
const ExercisePlan = (token) => {
  const onLoad = async() => {
    const result = await serverPost("POST", "exerciseplan-table", token);
        setData(result);
        console.log(result)
    }

    const [data, setData] = useState();

    useEffect(() => {
        onLoad();
      }, []);

    if (data === undefined) {
      return <div>Still Loading ...</div>
    }

    return (
        <div>
        {data.map(row => {
          <h3>Exercise Plan: {row[0][0]}</h3>
            return <ExerciseCard key={row[0][1]} name={row[0][2]} />
          })}
          </div>
    )
}

export default ExercisePlan;