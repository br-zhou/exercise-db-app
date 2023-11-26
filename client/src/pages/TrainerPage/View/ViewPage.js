import { Link, useParams } from "react-router-dom";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import { serverFetch } from "../../../utils/api";
import { useEffect, useState } from "react";
import ExercisePlanCard from "../../../components/ExercisePlanCard/ExercisePlanCard";

const TrainerViewPage = () => {
  const params = useParams();
  const id = params.clientId;
  const [data, setData] = useState([
    [1, "exercise 1"],
    [2, "exercise 2"],
  ]);

  const onLoad = async () => {
    const dummyData = await serverFetch("POST", "view");
    if (dummyData) {
      setData(dummyData);
      console.log(dummyData);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <Link to="/trainer-dashboard">
        <button class="bg-blue-500 hover:bg-blue-600 ml-8 text-white font-bold py-2 mt-8 px-4 rounded inline-block text-center mx-auto">
          Back
        </button>
      </Link>
      <h1 className="mt-8 text-3xl font-bold text-center">
        Client Information:
      </h1>
      <ClientDetails
        name="name"
        email="email"
        location="Postal, City, Country"
      />
      <h1 className="mt-8 text-3xl font-bold text-center">Client Exercises:</h1>
      <div class="flex justify-center items-center">
        <Link to="./new-plan">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-8 px-4 rounded inline-block text-center mx-auto">
            NEW EXERCISE
          </button>
        </Link>
      </div>
      {data.map(([epid, planType]) => (
        <ExercisePlanCard key={epid} title={planType} />
      ))}
    </div>
  );
};

export default TrainerViewPage;
