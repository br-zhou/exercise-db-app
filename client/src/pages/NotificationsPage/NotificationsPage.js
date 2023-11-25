import React, { useState } from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import TimedCard from "../../components/TimedCard/TimedCard";


const NotificationsPage = () => {

    return (
        <div>
          <div className="mt-8 text-3xl font-bold underline text-center">
            NOTIFICATIONS PAGE
          </div>

          <TimedCard />
        </div>
      );
    };
    
    export default NotificationsPage;
    
    
    
    