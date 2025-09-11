import './index.scss';
// Use public ICC logo with transparent background
const Logo = process.env.PUBLIC_URL + '/icc.png';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  faHome,
  faUser,
  faEnvelope,
  faBook,
  faBars,
  faClose,
  faHandshake,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { to: '/', icon: faHome, label: 'Home', end: true },
  { to: '/about', icon: faUser, label: 'About', className: 'about-link' },
  { to: '/resources', icon: faBook, label: 'Resources', className: 'resources-link' },
  { to: '/mediators', icon: faHandshake, label: 'Mediators', className: 'mediators-link' },
  { to: '/contact', icon: faEnvelope, label: 'Contact', className: 'contact-link' },
  { to: '/login', icon: faRightToBracket, label: 'Login', className: 'login-link' },
  { to: '/signup', icon: faUserPlus, label: 'Sign Up', className: 'signup-link' },
];

const SidebarItem = ({ to, icon, label, className, onClick, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => [className, isActive ? 'active' : ''].filter(Boolean).join(' ')}
    onClick={onClick}
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} />
  </NavLink>
);

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);
  const closeNav = () => setShowNav(false);

  return (
    <div className="nav-bar">
      <div className="logo-container">
        <Link
          className="logo"
          to="/"
          onClick={() => setShowNav(false)}
        >
          <img src={Logo} alt="ICC Logo" />
        </Link>
      </div>
      <nav className={showNav ? 'mobile-show' : ''}>
        {navItems.map((item) => (
          <SidebarItem key={item.to} {...item} onClick={closeNav} />
        ))}
        <FontAwesomeIcon
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#E7A29B"
          size="3x"
          className='close-icon' />
      </nav>
      <FontAwesomeIcon
        onClick={() => setShowNav(true)}
        icon={faBars}
        color="#E7A29B"
        size="3x"
        className='hamburger-icon' />
    </div>
  )
}

export default Sidebar
