

import React, { useState , useEffect} from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { serverFetch } from "../../utils/api";

const isVisibleDefault = false;
const timeoutDefault = 3000;

const NotificationsPage = () => {
 

  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "notifications-table");
    if (dummyData){
     setData(dummyData);
    console.log(dummyData)
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

  
  useEffect(() => {
    const dataTimeouts = data.map((card) =>
      setTimeout(() => {
        // Update the data state to make the specific card visible
        setData((prevData) =>
          prevData.map((prevCard) =>
            prevCard.rid === card.rid ? { ...prevCard, isVisibleDefault: true } : prevCard
          )
        );
      }, timeoutDefault)
    );
  
    // Clear timeouts if the component unmounts
    return () => dataTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [data]);
  

    return (
        <div>
          <div className="mt-8 text-3xl font-bold underline text-center">
            NOTIFICATIONS PAGE
          </div>


    <div>
      {data.map((card) => {
        console.log(card);
        return (
        card.isVisibleDefault && (
          <NotificationCard
            key={card[0]} // Use rid as the key
            title={card[2]}
            key1={card[1]}
          />
        )
      )})}
    </div>
  

        </div>
      );
    };
    
    export default NotificationsPage;
    
 