import './index.scss'
import Logo from '../../assets/images/logo.png'
import { Link , NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import {
  faHome,
  faUser,
  faEnvelope,
  faBook, // Icon for resources
  faHandshake, // Icon for mediators
  faBars,
  faClose,
} from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-bar">
      <div className="logo">
      <Link 
        className="logo"
        to="/"
        onClick={() => setShowNav(false)}>
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="subtitle">House Love</div>
      </div>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink 
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="about-link"
          to="/about"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="resources-link"
          to="/resources"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faBook} color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="mediators-link"
          to="/mediators"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHandshake} color="#4d4d4e" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="contact-link"
          to="/contact"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
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
          color="#ffd700"
          size="3x"
          className='hamburger-icon' />
    </div>
  )
}

export default Sidebar
