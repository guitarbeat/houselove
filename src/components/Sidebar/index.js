import './index.scss';
import Logo from '../../assets/images/logo.png';
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
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { to: '/', icon: faHome, label: 'Home' },
  { to: '/about', icon: faUser, label: 'About', className: 'about-link' },
  { to: '/resources', icon: faBook, label: 'Resources', className: 'resources-link' },
  { to: '/mediators', icon: faHandshake, label: 'Mediators', className: 'mediators-link' }, 
  { to: '/contact', icon: faEnvelope, label: 'Contact', className: 'contact-link' },
  // Add more items as needed
];

const SidebarItem = ({ to, icon, label, className, onClick }) => (
  <NavLink
    exact={to === '/'}
    activeClassName="active"
    to={to}
    className={className}
    onClick={onClick}
    aria-label={label}>
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
          onClick={() => setShowNav(false)}>
          <img src={Logo} alt="Logo" />
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
