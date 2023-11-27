import React, {useState, useEffect} from "react";
import NutritionPlan from "../../components/Plans/NutritionPlan";
import { serverPost } from "../../utils/api";
import ExercisePlan from "../../components/Plans/ExercisePlan";
const PlansPage = () => {
    const token = JSON.parse(localStorage.getItem("token")) || {};
    console.log(token);
    // const onLoad = async() => {
    // const result = await serverPost("POST", "exerciseplan-table", token);
    //     setData(result);
    //     // console.log(result)
    // }

    // useEffect(() => {
    //     onLoad();
    //   }, []);

    const [epid_list, setData] = useState([]);

    return (
        <div>
            <h1>Here are your plans</h1>
            <div>
                <div>
                    <h2>Nutrition</h2>
                    <NutritionPlan token={token}/>
                </div>
                <div>
                    <h2>Exercise</h2>
                    
                    {/* <ExercisePlan token={token}/> */}
                </div>
            </div>
        </div>
    )
}

export default PlansPage;