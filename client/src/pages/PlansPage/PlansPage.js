import React, {useState} from "react";
import NutritionPlan from "../../components/Plans/NutritionPlan";
import ExercisePlan from "../../components/Plans/ExercisePlan";
const PlansPage = () => {
    const token = JSON.parse(localStorage.getItem("token")) || {};
    console.log(token);


    return (
        <div>
            <h1>Here are your plans</h1>
            <div>
                <div>
                    <h2>Nutrition</h2>
                    <NutritionPlan token={token}/>
                </div>
                {/* <div>
                    <h2>Exercise</h2>
                    <ExercisePlan token={token}/>
                </div> */}
            </div>
        </div>
    )
}

export default PlansPage;