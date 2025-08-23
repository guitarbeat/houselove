import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const ThemeToggle = ({ className = '', fixed = true }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        const mql = window.matchMedia
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null;
        const prefersDark = mql ? mql.matches : false;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const classes = `theme-toggle btn btn--ghost btn--icon ${
        fixed ? 'theme-toggle--fixed' : ''
    } ${className}`.trim();

    return (
        <button
            className={classes}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </button>
    );
};

export default ThemeToggle;
