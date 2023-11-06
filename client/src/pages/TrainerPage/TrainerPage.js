import { useEffect, useState } from "react";
import { serverFetch } from "../../utils/api";

const TrainerPage = () => {
  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "example");
    setData(dummyData);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
};

export default TrainerPage;
