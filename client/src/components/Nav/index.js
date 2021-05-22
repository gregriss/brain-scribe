import React, { useState, Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import LoginForm from "../LoginForm";
import './style.scss';

function Nav() {
  const [loginExpanded, setLoginExpanded] = useState(false);
  const { email, loggedIn } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ borderBottom: '2px solid #ccc', boxShadow: 'inset 0 0 5px #BBB' }}>
      <a className="navbar-brand" href="/">
        BrainScribe
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
      </a>
      { (() => {
        if (loggedIn) {
          return <p className="logged-in-text">Logged in as {email} <Link to="/logout" onClick={() => setLoginExpanded(false)}>Logout</Link> </p>;
        }
        else {
          if (!loginExpanded) {
            return <button id="login-expand-btn" className="btn btn-secondary" role="button" onClick={() => setLoginExpanded(true)}>Login</button>;
          }
          else {
            return (
              <Fragment>
                <LoginForm className="top-menu-login" />
                <button id="hide-login-x" onClick={() => setLoginExpanded(false)}>&#10006;</button>
              </Fragment>
            )
          }
        }
      })()}

    </nav>
  );
}

export default Nav;
