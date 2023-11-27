import { useEffect, useState } from "react";
import { serverFetch } from "../../utils/api";
import ClientCard from "../../components/ClientCard/ClientCard";
import { useNavigate } from "react-router-dom";

const TrainerPage = () => {
  const token = JSON.parse(localStorage.getItem("trainer-token")) || {};
  
  console.log("token", token);

  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "fuser-table");
    if (dummyData) {
      setData(dummyData);
      console.log(dummyData);
    }
    // todo: get client data
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

  return (
    <div>
      <h1 className="mt-8 text-3xl font-bold text-center">
        Welcome, {token.name}
      </h1>
      <h1 className="mt-8 text-3xl font-bold text-center">Clients</h1>
      {data.map((row) => {
        return (
          <ClientCard
            key={row[0]}
            name={row[1]}
            email={row[2]}
            location="location"
            to={`/trainer-dashboard/view/${row[0]}`}
          />
        );
      })}
    </div>
  );
};

export default TrainerPage;
