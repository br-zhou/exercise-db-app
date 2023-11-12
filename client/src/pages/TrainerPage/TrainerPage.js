import { useEffect, useState } from "react";
import { serverFetch } from "../../utils/api";
import ClientCard from "../../components/ClientCard/ClientCard";

const TrainerPage = () => {
  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "fuser-table");
    setData(dummyData);
    console.log(dummyData)
    // todo: get client data
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold text-center">Clients</h1>
      {data.map(row => {
        return <ClientCard key={row[0]} name={row[1]} email={row[2]} location="location" to={null} />
      })}
    </div>
  );
};

export default TrainerPage;
