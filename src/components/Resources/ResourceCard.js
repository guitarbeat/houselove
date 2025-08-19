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
  const [copied, setCopied] = useState(false);

  const handleCardClick = (e) => {
    if (!isClicked) {
      e.preventDefault();
      setIsClicked(true);
    }
  };

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(String(url || ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      // no-op
    }
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="resource-card" onClick={handleCardClick}>
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
      <div className="resource-card__actions">
        <button className="copy-btn" onClick={handleCopy} aria-label="Copy link to clipboard">
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        {isClicked && (
          <span className="hint">Click again to open</span>
        )}
      </div>
    </a>
  );
};

export default ResourceCard;
