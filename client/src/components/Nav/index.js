import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import LoginForm from "../LoginForm";
import './style.scss';

function Nav() {
  const [loginExpanded, setLoginExpanded] = useState(false);
  const { email, loggedIn } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: '2px solid #ccc', boxShadow: 'inset 0 0 5px #BBB', display: 'flex' }}>
      <a className="navbar-brand" href="/ideas">
        BrainScribe
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
      </a>
      { (() => {
        if (loggedIn) {
          return <p className="logged-in-text">Logged in as {email} <Link to="/logout" className="text-primary" style={{ margin: '0 6px' }} onClick={() => setLoginExpanded(false)}>Logout</Link></p>;
        }
        // else {
        // if (!loginExpanded) {
        //   return <button id="login-expand-btn" className="btn btn-outline-success" onClick={() => setLoginExpanded(true)}>Login</button>;
        // }
        // else {
        //   return (
        //     <Fragment>
        //       <LoginForm className="top-menu-login" />
        //       <button id="hide-login-x" onClick={() => setLoginExpanded(false)}>&#10006;</button>
        //     </Fragment>
        //   )
        // }
        // }
      })()}
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul
          className="navbar-nav mr-auto"
          style={{ justifyContent: 'flex-end' }}
        >
          <li className="nav-item">
            <Link
              to="/login"
              className="btn btn-outline-success"
              id="signup-nav-link"
              style={{ margin: '2px' }}
            >
              Login
          </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signup"
              className="btn btn-outline-success"
              id="signup-nav-link"
              style={{ margin: '2px' }}
            >
              Sign Up
          </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ideas"
              className="btn btn-outline-info"
              style={{ margin: '2px' }}
              id="ideas-nav-link"
            >
              Ideas/Home
          </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/speech"
              className="btn btn-outline-info"
              style={{ margin: '2px' }}
              id="speech-nav-link"
            >
              Speech to Text
          </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
