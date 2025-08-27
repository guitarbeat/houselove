import React, { useState, useEffect, useMemo } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import ResourceCard from './ResourceCard';
import googleSheetsApi from '../../utils/googleSheetsApi';
import './index.scss';

const Resources = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [resources, setResources] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [uniqueResourceTypes, setUniqueResourceTypes] = useState([]);
  const [activeSubmitter, setActiveSubmitter] = useState('All');
  const [uniqueSubmitters, setUniqueSubmitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | az | za

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const data = await googleSheetsApi.fetchResources();
        setResources(data);

        const resourceTypes = new Set(data.map(resource => resource['Resource Type']).filter(Boolean));
        setUniqueResourceTypes(['All', ...Array.from(resourceTypes)]);
        const submitters = new Set(data.map(r => r['Submitted By']).filter(Boolean));
        setUniqueSubmitters(['All', ...Array.from(submitters)]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredAndSortedResources = useMemo(() => {
    let currentResources = resources;

    // Apply type filter
    if (activeFilter !== 'All') {
      currentResources = currentResources.filter(
        (resource) => resource['Resource Type'] === activeFilter
      );
    }

    // Apply submitter filter
    if (activeSubmitter !== 'All') {
      currentResources = currentResources.filter(
        (resource) => resource['Submitted By'] === activeSubmitter
      );
    }

    // Apply search
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      currentResources = currentResources.filter((resource) => {
        const name = String(resource['Title'] || '').toLowerCase();
        const description = String(resource['Description'] || '').toLowerCase();
        const type = String(resource['Resource Type'] || '').toLowerCase();

        return name.includes(normalizedQuery)
          || description.includes(normalizedQuery)
          || type.includes(normalizedQuery);
      });
    }

    // Apply sort
    const toDate = (value) => {
      const d = new Date(value);
      return isNaN(d.getTime()) ? 0 : d.getTime();
    };

    switch (sortBy) {
      case 'oldest':
        currentResources = currentResources.slice().sort((a, b) => toDate(a['Date Added']) - toDate(b['Date Added']));
        break;
      case 'az':
        currentResources = currentResources.slice().sort((a, b) => String(a['Title']).localeCompare(String(b['Title'])));
        break;
      case 'za':
        currentResources = currentResources.slice().sort((a, b) => String(b['Title']).localeCompare(String(a['Title'])));
        break;
      case 'newest':
      default:
        currentResources = currentResources.slice().sort((a, b) => toDate(b['Date Added']) - toDate(a['Date Added']));
        break;
    }

    return currentResources;
  }, [resources, activeFilter, searchQuery, sortBy]);

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
            Browse our resources via a{' '}
            <a
              href="https://docs.google.com/spreadsheets/d/1zG32wvIIPsXn0J6i88GF6CisVvlePeZGah53FbTBpzw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              read‑only Google Sheet
            </a>
            . To suggest additions, use the{' '}
            <a
              href="https://forms.gle/nYYfwdMbC4rL3hMY6"
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Google Form
            </a>
            ; submissions are reviewed before being published.
          </p>

          {/* Loading State */}
          {loading && (
            <div className="loading-message">
              <p>Loading resources...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-message">
              <p>Error loading resources: {error}</p>
              <p>Please check your internet connection and try again.</p>
            </div>
          )}

          {!loading && !error && (
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
                  className="resource-submit-select"
                  aria-label="Filter by submitter"
                  value={activeSubmitter}
                  onChange={(e) => setActiveSubmitter(e.target.value)}
                >
                  {uniqueSubmitters.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
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
          )}
        </div>

        {/* Resource Cards */}
        {!loading && !error && (
          <>
            {filteredAndSortedResources.length > 0 ? (
              <div className="resources-container">
                {filteredAndSortedResources.map((resource, index) => (
                  <ResourceCard key={index} {...resource} />
                ))}
              </div>
            ) : (
              <p>No resources found.</p>
            )}
          </>
        )}
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default Resources;

