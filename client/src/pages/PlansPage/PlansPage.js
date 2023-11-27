import React, {useState} from "react";
import NutritionPlan from "../../components/Plans/NutritionPlan";
import ExercisePlan from "../../components/Plans/ExercisePlan";
const PlansPage = () => {
    return (
        <div>
            <h1>Here are your plans</h1>
            <div>
                <div>
                    <h2>Nutrition</h2>
                    <NutritionPlan />
                </div>
                <div>
                    <h2>Exercise</h2>
                    <ExercisePlan />
                </div>
            </div>
        </div>
    )
}

export default PlansPage;