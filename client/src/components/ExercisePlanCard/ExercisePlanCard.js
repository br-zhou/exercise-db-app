const ExercisePlanCard = (props) => {

  const deleteHandler = () => {
    console.log("delete!")
  }

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg border-4 border-black">
      <div className="card-body">
        <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
        <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExercisePlanCard;
