import React from "react";

const ExerciseCard = (exercise) => {
    return (
        <div>
            <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">{exercise.name}</h5>
          <h6 className="text-sm text-gray-600 mb-2">{exercise.type}</h6>
          
        </div>
      </div>
        </div>
    )
}

export default ExerciseCard;