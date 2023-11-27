import { useEffect, useState } from "react";
import { serverPost } from "../../utils/api";
import ExerciseCard from "./ExerciseCard";
const ExercisePlan = (token) => {
  const onLoad = async() => {
    const result = await serverPost("POST", "exerciseplan-table", token);
        setData(result);
        // console.log(result)
    }

    const [data, setData] = useState();

    useEffect(() => {
        onLoad();
      }, []);

    return (
        <div>
        {/* {data.map(row => {
            return <ExerciseCard key={row[0]} name={row[1]} type={row[2]} />
          })} */}
          </div>
    )
}

export default ExercisePlan;