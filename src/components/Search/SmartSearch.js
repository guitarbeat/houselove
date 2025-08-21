import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faTimes,
    faClock,
    faHistory,
    faSpinner,
    faArrowUp,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './SmartSearch.scss';

const SmartSearch = ({
    placeholder = "Search...",
    onSearch,
    searchHistory = [],
    suggestions = [],
    isLoading = false,
    className = ""
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [recentSearches, setRecentSearches] = useState(searchHistory);
    const [showHistory, setShowHistory] = useState(false);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // * Handle input changes with debouncing
    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedIndex(-1);

        if (value.trim()) {
            setIsOpen(true);
            setShowHistory(false);
            // * Trigger search with debouncing
            if (onSearch) {
                onSearch(value);
            }
        } else {
            setIsOpen(false);
            setShowHistory(true);
        }
    }, [onSearch]);

    // * Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen && !showHistory) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < (suggestions.length - 1) ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                } else if (query.trim()) {
                    handleSearch(query);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setShowHistory(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    }, [isOpen, showHistory, suggestions, selectedIndex, query]);

    // * Handle suggestion selection
    const handleSuggestionSelect = useCallback((suggestion) => {
        setQuery(suggestion.title || suggestion.name || suggestion);
        setIsOpen(false);
        setSelectedIndex(-1);

        // * Add to recent searches
        addToRecentSearches(suggestion.title || suggestion.name || suggestion);

        // * Navigate or trigger action
        if (suggestion.path) {
            navigate(suggestion.path);
        } else if (onSearch) {
            onSearch(suggestion.title || suggestion.name || suggestion);
        }
    }, [navigate, onSearch]);

    // * Handle search submission
    const handleSearch = useCallback((searchQuery) => {
        if (!searchQuery.trim()) return;

        addToRecentSearches(searchQuery);
        setIsOpen(false);
        setShowHistory(false);

        if (onSearch) {
            onSearch(searchQuery);
        }
    }, [onSearch]);

    // * Add search to recent history
    const addToRecentSearches = useCallback((searchTerm) => {
        setRecentSearches(prev => {
            const filtered = prev.filter(item => item !== searchTerm);
            return [searchTerm, ...filtered].slice(0, 5); // * Keep last 5 searches
        });
    }, []);

    // * Clear search history
    const clearHistory = useCallback(() => {
        setRecentSearches([]);
        setShowHistory(false);
    }, []);

    // * Handle input focus
    const handleFocus = useCallback(() => {
        if (query.trim()) {
            setIsOpen(true);
            setShowHistory(false);
        } else {
            setShowHistory(true);
        }
    }, [query]);

    // * Handle input blur
    const handleBlur = useCallback(() => {
        // * Delay closing to allow for clicks on suggestions
        setTimeout(() => {
            setIsOpen(false);
            setShowHistory(false);
            setSelectedIndex(-1);
        }, 150);
    }, []);

    // * Handle suggestion click
    const handleSuggestionClick = useCallback((suggestion, index) => {
        setSelectedIndex(index);
        handleSuggestionSelect(suggestion);
    }, [handleSuggestionSelect]);

    // * Handle recent search click
    const handleRecentClick = useCallback((searchTerm) => {
        setQuery(searchTerm);
        handleSearch(searchTerm);
    }, [handleSearch]);

    // * Clear input
    const clearInput = useCallback(() => {
        setQuery('');
        setIsOpen(false);
        setShowHistory(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    }, []);

    // * Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowHistory(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`smart-search ${className}`} ref={dropdownRef}>
            {/* * Search Input */}
            <div className="smart-search__input-wrapper">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="smart-search__icon smart-search__icon--search"
                    aria-hidden="true"
                />

                <input
                    ref={inputRef}
                    type="text"
                    className="smart-search__input focus-ring"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label="Search"
                    aria-expanded={isOpen || showHistory}
                    aria-haspopup="listbox"
                    role="combobox"
                    aria-autocomplete="list"
                />

                {query && (
                    <button
                        type="button"
                        className="smart-search__clear-btn interactive"
                        onClick={clearInput}
                        aria-label="Clear search"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}

                {isLoading && (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        className="smart-search__icon smart-search__icon--loading"
                        spin
                        aria-hidden="true"
                    />
                )}
            </div>

            {/* * Dropdown with Suggestions or History */}
            {(isOpen || showHistory) && (
                <div className="smart-search__dropdown">
                    {isOpen && suggestions.length > 0 && (
                        <div className="smart-search__suggestions">
                            <div className="smart-search__section-header">
                                <FontAwesomeIcon icon={faSearch} />
                                <span>Suggestions</span>
                            </div>

                            <ul
                                className="smart-search__suggestions-list"
                                role="listbox"
                                aria-label="Search suggestions"
                            >
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className={`smart-search__suggestion-item ${index === selectedIndex ? 'smart-search__suggestion-item--selected' : ''
                                            }`}
                                        onClick={() => handleSuggestionClick(suggestion, index)}
                                        role="option"
                                        aria-selected={index === selectedIndex}
                                    >
                                        <span className="smart-search__suggestion-text">
                                            {suggestion.title || suggestion.name || suggestion}
                                        </span>
                                        {suggestion.description && (
                                            <span className="smart-search__suggestion-description">
                                                {suggestion.description}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {showHistory && recentSearches.length > 0 && (
                        <div className="smart-search__history">
                            <div className="smart-search__section-header">
                                <FontAwesomeIcon icon={faHistory} />
                                <span>Recent Searches</span>
                                <button
                                    type="button"
                                    className="smart-search__clear-history-btn"
                                    onClick={clearHistory}
                                    aria-label="Clear search history"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            <ul className="smart-search__history-list">
                                {recentSearches.map((searchTerm, index) => (
                                    <li key={index}>
                                        <button
                                            type="button"
                                            className="smart-search__history-item interactive"
                                            onClick={() => handleRecentClick(searchTerm)}
                                            aria-label={`Search for ${searchTerm}`}
                                        >
                                            <FontAwesomeIcon icon={faClock} />
                                            <span>{searchTerm}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {isOpen && suggestions.length === 0 && query.trim() && !isLoading && (
                        <div className="smart-search__no-results">
                            <p>No results found for "{query}"</p>
                            <p className="smart-search__no-results-hint">
                                Try different keywords or check your spelling
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SmartSearch;
