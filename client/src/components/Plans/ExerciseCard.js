import React from "react";

const ExerciseCard = (props) => {
    return (
        <div>
          {props.exercise.map(row => {
            console.log(row);
            return (
                <p className="text-s mb-2 text-gray-700">{row[2]}</p>
            )
          })}
        </div>
    )
}

export default ExerciseCard;