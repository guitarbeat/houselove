import React, { useState } from 'react';

const tagColor = {
  Article: "#386FA4",
  Video: "#DE7254",
  eBook: "#67a286",
  // Add more resource types and colors as needed
};

const ResourceCard = ({ 
  'Resource Name': name, 
  'Description': description, 
  'URL': url, 
  'Resource Type': resourceType,
  'Submitted By': submittedBy,
  'Date Added': dateAdded
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if (!isClicked) {
      e.preventDefault();
      setIsClicked(true);
    }
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="resource-card" onClick={handleClick}>
      <div className="resource-card__header">
        <div className="resource-card__keywords">
          <div
            className="resource-card__label"
            style={{ backgroundColor: tagColor[resourceType] || "#67a286" }}
          >
            {resourceType}
          </div>
        </div>
        <h3>{name}</h3>
      </div>
      <p className={isClicked ? "show-text" : ""}>{description}</p>
      <div className="resource-card__footer">
        <div className="resource-card__submitted-by">Submitted by: {submittedBy}</div>
        <div className="resource-card__date-added">Date Added: {dateAdded}</div>
      </div>
    </a>
  );
};

export default ResourceCard;
