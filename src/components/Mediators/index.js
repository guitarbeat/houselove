import React, { useEffect, useState } from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

const MediatorCard = ({ name, contact, expertise, availability }) => (
  <div className="mediator-card">
    <h3>{name}</h3>
    <p>Contact: {contact}</p>
    <p>Expertise: {expertise}</p>
    <p>Availability: {availability}</p>
  </div>
);

const Mediators = ({ db }) => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="container mediators-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['M', 'e', 'd', 'i', 'a', 't', 'o', 'r', 's']}
              idx={15}
            />
          </h1>
          <p>
            Welcome to the Mediators page! Here you can find a list of conflict mediators who are available to assist housing cooperatives.
          </p>
          <p>
            Explore the list below to find a mediator who fits your needs, and feel free to reach out to them directly for assistance.
          </p>
        </div>
        <div className="mediators-container">
          {db.mediators.map((mediator, index) => (
            <MediatorCard key={index} {...mediator} />
          ))}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
}

export default withGoogleSheets('mediators')(Mediators);