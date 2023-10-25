import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

const MediatorCard = ({ 
  name, 
  description, 
  location,
  specialization,
  contact,
  updateMap,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    updateMap(location.lat, location.lng, 14); // Adjust zoom level as needed
  };

  const contactIcons = {
    email: faEnvelope,
    phone: faPhone,
    // add other types of contact info and their corresponding icons here
  };

  return (
    <div className="mediator-card" onClick={handleClick}>
      <div className="mediator-card__header">
        <h3>{name}</h3>
        <div className="mediator-card__specialization">{specialization}</div>
      </div>
      <p className={isClicked ? "show-text" : ""}>{description}</p>
      <div className="mediator-card__footer">
        {Object.entries(contact).map(([type, value]) => (
          <div key={type} className="mediator-card__contact">
            <FontAwesomeIcon icon={contactIcons[type]} />
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediatorCard;
