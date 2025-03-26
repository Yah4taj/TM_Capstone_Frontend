import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <h1>The Focus Hub
            </h1>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/groups" className="nav-link">Study Groups</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;