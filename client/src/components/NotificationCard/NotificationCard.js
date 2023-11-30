import React, { useState } from 'react';

const NotificationCard = (props) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  return (
    !isClosed && (
      <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <button
            className="close-button"
            onClick={handleClose}
            aria-label="Close"
          >
            X
          </button>
          <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
          <p className="text-sm text-gray-700 mb-4">Notification for: {props.key1}</p>
        </div>
      </div>
    )
  );
};

export default NotificationCard;

