import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import './index.scss';

const ThemeToggle = ({ className = '', fixed = true }) => {
    const { isDark, toggleTheme } = useTheme();

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
