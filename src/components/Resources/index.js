import React, { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import ResourceCard from './ResourceCard'; 
import './index.scss';

const Resources = ({ db }) => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [filteredResources, setFilteredResources] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [uniqueResourceTypes, setUniqueResourceTypes] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (db && db.resources) {
      const resourceTypes = new Set(db.resources.map(resource => resource['Resource Type']));
      setUniqueResourceTypes(['All', ...Array.from(resourceTypes)]);
    }
  }, [db]);

  useEffect(() => {
    if (db && db.resources) {
      if (activeFilter === 'All') {
        setFilteredResources(db.resources);
      } else {
        const filtered = db.resources.filter(
          (resource) => resource['Resource Type'] === activeFilter
        );
        setFilteredResources(filtered);
      }
    }
  }, [db, activeFilter]);

  const handleFilterClick = (filter) => () => {
    setActiveFilter(filter);
  };

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
          <p>
            Contribute to our list of resources by adding to our{' '}
            <a
              href="https://docs.google.com/spreadsheets/d/1zG32wvIIPsXn0J6i88GF6CisVvlePeZGah53FbTBpzw/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              public Google Sheet
            </a>
            {' or '}
            <a
              href="https://forms.gle/nYYfwdMbC4rL3hMY6"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Google Form
            </a>
            .
          </p>
          
          {/* Resource Filter Buttons */}
          <div className="resource-filter-buttons-container">
            <span className="filters-label">Filters</span>
            <div className="resource-filter-buttons">
              {uniqueResourceTypes.map(type => (
                <button
                  key={type}
                  onClick={handleFilterClick(type)}
                  className={activeFilter === type ? 'active' : ''}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Resource Cards */}
        {db && filteredResources.length > 0 ? (
          <div className="resources-container">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        ) : (
          <p>No resources found.</p>
        )}
      </div>
      
      <Loader type="pacman" />
    </>
  );
};

export default Resources;
