import React, { useState, useEffect } from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

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
  'Image/Thumbnail': image,
  'Resource Type': resourceType
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
      <div className="resource-card__keywords">
        <div
          className="resource-card__label"
          style={{ backgroundColor: tagColor[resourceType] || "#67a286" }}
        >
          {resourceType}
        </div>
      </div>
      {image && <img src={image} alt={name} className="resource-image" />}
      <h3>{name}</h3>
      <p className={isClicked ? "show-text" : ""}>{description}</p>
      <div className="learn-more">Learn More</div>
    </a>
  );
};

const Resources = ({ db }) => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="container resources-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['R', 'e', 's', 'o', 'u', 'r', 'c', 'e', 's']}
              idx={15}
            />
          </h1>
          <p>
            Welcome to the Resources page! Here you can find a variety of resources to help support housing cooperatives.
          </p>
          <p>
            Explore documentation, guides, tools, and more to assist you in managing and participating in your cooperative living experience.
          </p>
        </div>
        {db && db.resources ? (
          <div className="resources-container">
            {db.resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        ) : (
          <p>Loading resources...</p>
        )}
      </div>
      <Loader type="pacman" />
    </>
  );
};

export default withGoogleSheets('resources')(Resources);
