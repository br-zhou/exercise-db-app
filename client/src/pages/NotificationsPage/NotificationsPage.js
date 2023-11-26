import React, { useState , useEffect} from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { serverFetch } from "../../utils/api";


const NotificationsPage = () => {
  
    const [cards, setCards] = useState([
      { rid: 1, title: 'Water reminder', content: 'Have Water', timeout: 5000, isVisible: false }, 
      { rid: 2, title: 'Rest reminder', content: 'Take some rest', timeout: 5000, isVisible: false }, 
      { rid: 3, title: 'Sleep reminder', content: 'Please sleep now', timeout: 5000, isVisible: false }, 
    ]);
  

  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "notifications-table");
     setData(dummyData);
    console.log(dummyData)
    // todo: get client data
  };

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);


  useEffect(() => {
    const cardTimeouts = cards.map((card) =>
      setTimeout(() => {
        // Update the cards state to make the specific card visible
        setCards((prevCards) =>
          prevCards.map((prevCard) =>
            prevCard.rid === card.rid ? { ...prevCard, isVisible: true } : prevCard
          )
        );
      }, card.timeout)
    );

    // Clear timeouts if the component unmounts
    return () => cardTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [cards]);

    return (
        <div>
          <div className="mt-8 text-3xl font-bold underline text-center">
            NOTIFICATIONS PAGE
          </div>


    <div>
      {cards.map((card) => (
        card.isVisible && (
          <NotificationCard
            key={card.rid} // Use rid as the key
            title={card.title}
            content={card.content}
          />
        )
      ))}
    </div>

    <div>
      {data.map((card) => (
        card.isVisible && (
          <NotificationCard
            key={card.rid} // Use rid as the key
            title={card.title}
            content={card.content}
          />
        )
      ))}
    </div>
  

        </div>
      );
    };
    
    export default NotificationsPage;
    
    
    
    