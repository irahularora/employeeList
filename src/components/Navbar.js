import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png';

export default function Navbar(props) {
  let history = useNavigate();
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark header-fixed">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              style={{ width: '65px' }}
              className="nav-logo img-fluid"
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link active`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link`} to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}