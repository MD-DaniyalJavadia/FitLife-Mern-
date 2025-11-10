import React from "react";
import { IonIcon } from "@ionic/react";
import { Link, Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { barbellSharp, closeSharp } from "ionicons/icons";

const Header = () => {
  return (
    <header className="header" data-header>
      <div className="container">
        <a href="#" className="logo">
          <IonIcon icon={barbellSharp} aria-hidden="true" />
          <span className="span">Fitlife</span>
        </a>

        <nav className="navbar" data-navbar>
          <button
            className="nav-close-btn"
            aria-label="close menu"
            data-nav-toggler
          >
            <IonIcon icon={closeSharp} aria-hidden="true" />
          </button>

          <ul className="navbar-list">
            <li>
              <ScrollLink
                to="home"
                smooth={true}
                duration={600}
                offset={-80}
                className="navbar-link active"
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="about"
                smooth={true}
                duration={600}
                offset={-80}
                className="navbar-link"
              >
                About Us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="class"
                smooth={true}
                duration={600}
                offset={-80}
                className="navbar-link"
              >
                Our Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="blog"
                smooth={true}
                duration={600}
                offset={-80} // adjust if needed for header height
                className="navbar-link"
              >
                Start Today
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={600}
                offset={-80}
                className="navbar-link"
              >
                Contact Us
              </ScrollLink>
            </li>
          </ul>
        </nav>

        <a href="/register" className="btn btn-secondary">
          Join Now
        </a>
        <button
          className="nav-open-btn"
          aria-label="open menu"
          data-nav-toggler
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;