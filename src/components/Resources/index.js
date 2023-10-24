import React, { useState, useEffect } from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import ResourceCard from './ResourceCard'; 
import './index.scss';

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
