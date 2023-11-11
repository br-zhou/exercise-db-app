import { NavLink } from "react-router-dom";

const GoalCard = (props) => {
  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">{props.category}</h5>
          <h6 className="text-sm text-gray-600 mb-2">{props.date}</h6>
          <p className="text-sm text-gray-700 mb-4">{props.weight}</p>
          
        </div>
      </div>
  );
};

export default GoalCard;
