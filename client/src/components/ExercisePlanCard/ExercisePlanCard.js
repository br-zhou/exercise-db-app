const ExercisePlanCard = (props) => {
  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg border-4 border-black">
      <div className="card-body">
        <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
      </div>
    </div>
  );
};

export default ExercisePlanCard;
