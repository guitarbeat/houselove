<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from 'react';
import { withGoogleSheets } from 'react-db-google-sheets';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> origin/main
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import ResourceCard from './ResourceCard'; 
import './index.scss';

const Resources = ({ db }) => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [activeFilter, setActiveFilter] = useState('All');
  const [uniqueResourceTypes, setUniqueResourceTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | az | za

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (db && db.resources) {
      const resourceTypes = new Set(db.resources.map(resource => resource['Resource Type']).filter(Boolean));
      setUniqueResourceTypes(['All', ...Array.from(resourceTypes)]);
    }
  }, [db]);

  const filteredAndSortedResources = useMemo(() => {
    if (!db || !db.resources) return [];

    const normalizedQuery = searchQuery.trim().toLowerCase();

    let results = db.resources.filter((resource) => {
      const matchesType = activeFilter === 'All' || resource['Resource Type'] === activeFilter;

      if (!normalizedQuery) return matchesType;

      const name = String(resource['Resource Name'] || '').toLowerCase();
      const description = String(resource['Description'] || '').toLowerCase();
      const type = String(resource['Resource Type'] || '').toLowerCase();

      const matchesQuery = name.includes(normalizedQuery)
        || description.includes(normalizedQuery)
        || type.includes(normalizedQuery);

      return matchesType && matchesQuery;
    });

    const toDate = (value) => {
      // Try to parse common date formats; fallback to epoch 0
      const d = new Date(value);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    };

    switch (sortBy) {
      case 'oldest':
        results = results.slice().sort((a, b) => toDate(a['Date Added']) - toDate(b['Date Added']));
        break;
      case 'az':
        results = results.slice().sort((a, b) => String(a['Resource Name']).localeCompare(String(b['Resource Name'])));
        break;
      case 'za':
        results = results.slice().sort((a, b) => String(b['Resource Name']).localeCompare(String(a['Resource Name'])));
        break;
      case 'newest':
      default:
        results = results.slice().sort((a, b) => toDate(b['Date Added']) - toDate(a['Date Added']));
        break;
    }

    return results;
  }, [db, activeFilter, searchQuery, sortBy]);

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

          {/* Controls */}
          <div className="resource-controls">
            <div className="resource-filter-buttons-container">
              <span className="filters-label">Filters</span>
              <div className="resource-filter-buttons">
                {uniqueResourceTypes.map(type => (
                  <button
                    key={type}
                    onClick={handleFilterClick(type)}
                    className={activeFilter === type ? 'active' : ''}
                    aria-pressed={activeFilter === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="resource-search-sort">
              <input
                type="search"
                className="resource-search-input"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
              <select
                className="resource-sort-select"
                aria-label="Sort resources"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
              </select>
            </div>
          </div>
        </div>
        {/* Resource Cards */}
        {db && filteredAndSortedResources.length > 0 ? (
          <div className="resources-container">
            {filteredAndSortedResources.map((resource, index) => (
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
