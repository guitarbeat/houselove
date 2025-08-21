import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Breadcrumb.scss';

const Breadcrumb = () => {
    const location = useLocation();

    // * Generate breadcrumb items based on current path
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [];

        // * Always start with home
        breadcrumbs.push({
            name: 'Home',
            path: '/',
            icon: faHome,
            isHome: true
        });

        // * Build path segments
        let currentPath = '';
        pathnames.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // * Convert segment to readable name
            const name = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            breadcrumbs.push({
                name,
                path: currentPath,
                isLast: index === pathnames.length - 1
            });
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs.length <= 1) {
        return null; // * Don't show breadcrumb on home page
    }

    return (
        <nav
            className="breadcrumb"
            aria-label="Breadcrumb navigation"
            role="navigation"
        >
            <ol className="breadcrumb__list">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.path}
                        className={`breadcrumb__item ${breadcrumb.isLast ? 'breadcrumb__item--current' : ''}`}
                    >
                        {breadcrumb.isLast ? (
                            // * Current page - not clickable
                            <span
                                className="breadcrumb__current"
                                aria-current="page"
                            >
                                {breadcrumb.icon && (
                                    <FontAwesomeIcon
                                        icon={breadcrumb.icon}
                                        className="breadcrumb__icon"
                                        aria-hidden="true"
                                    />
                                )}
                                {breadcrumb.name}
                            </span>
                        ) : (
                            // * Clickable breadcrumb link
                            <Link
                                to={breadcrumb.path}
                                className="breadcrumb__link focus-ring interactive"
                                aria-label={`Navigate to ${breadcrumb.name}`}
                            >
                                {breadcrumb.icon && (
                                    <FontAwesomeIcon
                                        icon={breadcrumb.icon}
                                        className="breadcrumb__icon"
                                        aria-hidden="true"
                                    />
                                )}
                                {breadcrumb.name}
                            </Link>
                        )}

                        {/* * Separator (except for last item) */}
                        {!breadcrumb.isLast && (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="breadcrumb__separator"
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
