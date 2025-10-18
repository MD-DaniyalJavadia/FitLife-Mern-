import React from "react";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
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
          <button className="nav-close-btn" aria-label="close menu" data-nav-toggler>
            <IonIcon icon={closeSharp} aria-hidden="true" />
          </button>

          <ul className="navbar-list">
            <li><Link to="#home" className="navbar-link active" data-nav-link>Home</Link></li>
            <li><Link to="#about" className="navbar-link" data-nav-link>About Us</Link></li>
            <li><Link to="#class" className="navbar-link" data-nav-link>Our Services</Link></li>
            <li><Link to="/register" className="navbar-link" data-nav-link>Start Today</Link></li>
            <li><Link to="#contact" className="navbar-link" data-nav-link>Contact Us</Link></li>

          </ul>
        </nav>

        <a href="#" className="btn btn-secondary">Join Now</a>

        <button className="nav-open-btn" aria-label="open menu" data-nav-toggler>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
