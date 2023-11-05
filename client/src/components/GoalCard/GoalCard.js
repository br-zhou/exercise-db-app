import { NavLink } from "react-router-dom";

const GoalCard = (props) => {
  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">{props.category}</h5>
          <h6 className="text-sm text-gray-600 mb-2">{props.date}</h6>
          <p className="text-sm text-gray-700 mb-4">{props.weight}</p>
          <a href="#" className="text-blue-500 hover:underline block mb-2">Card link</a>
          <a href="#" className="text-blue-500 hover:underline">Another link</a>
        </div>
      </div>
  );
};

export default GoalCard;
