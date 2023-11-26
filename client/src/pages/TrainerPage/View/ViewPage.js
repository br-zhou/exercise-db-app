import { useParams } from "react-router-dom";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import { serverFetch } from "../../../utils/api";
import { useEffect, useState } from "react";
import ExercisePlanCard from "../../../components/ExercisePlanCard/ExercisePlanCard";

const TrainerViewPage = () => {
  const params = useParams();
  const id = params.clientId;
  const [data, setData] = useState([]);

  const onLoad = async () => {
    const dummyData = await serverFetch("POST", "view");
    setData(dummyData);
    console.log(dummyData)
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold text-center">Client Information:</h1>
      <ClientDetails name="name" email="email" location="Postal, City, Country"/>
      <h1 className="mt-8 text-3xl font-bold text-center">Client Exercises: </h1>
      {data.map(([epid, planType]) => <ExercisePlanCard key={epid} title={planType}/>)}
    </div>
  );
};

export default TrainerViewPage;
