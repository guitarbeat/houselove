import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faCopy,
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
  const [copiedKey, setCopiedKey] = useState(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
    updateMap(location.lat, location.lng, 14); // Adjust zoom level as needed
  };

  const contactIcons = {
    email: faEnvelope,
    phone: faPhone,
    // add other types of contact info and their corresponding icons here
  };

  const getContactHref = (type, value) => {
    if (!value) return '#';
    if (type === 'email') return `mailto:${value}`;
    if (type === 'phone') return `tel:${value}`;
    return value;
  };

  const handleCopy = async (key, value, e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(String(value || ''));
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (_) {
      // no-op
    }
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
            <a href={getContactHref(type, value)} onClick={(e) => e.stopPropagation()}>
              <span>{value}</span>
            </a>
            <button className="copy-contact-btn" onClick={(e) => handleCopy(type, value, e)} aria-label={`Copy ${type}`}>
              <FontAwesomeIcon icon={faCopy} />
              <span>{copiedKey === type ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediatorCard;
