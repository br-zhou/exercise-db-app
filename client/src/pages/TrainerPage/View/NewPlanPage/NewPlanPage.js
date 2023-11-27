import { useEffect, useState } from "react";
import NewPlanCard from "../../../../components/NewPlanCard/NewPlanCard";
import { serverFetch } from "../../../../utils/api";

const NewPlanPage = () => {
  const [data, setData] = useState([]);

  const onLoad = async () => {
    const newData = await serverFetch("GET", "exercise-table");
    if (newData) setData(newData);
    console.log(newData);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleSubmit = (event) => {
    console.log(event);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        New Plan
      </h1>
      <NewPlanCard handleSubmit={handleSubmit} />
    </div>
  );
};

export default NewPlanPage;
