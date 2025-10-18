import React from "react";
import { IonIcon } from "@ionic/react";
import { barbellSharp, logoFacebook, logoInstagram, logoTwitter } from "ionicons/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="section footer-top bg-dark has-bg-image" style={{ backgroundImage: "url('./assets/images/footer-bg.png')" }}>
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <IonIcon icon={barbellSharp} />
              <span className="span">Fitlife</span>
            </a>
            <p className="footer-brand-text">Etiam suscipit fringilla ullamcorper.</p>
          </div>

          <ul className="social-list">
            <li><a href="#" className="social-link"><IonIcon icon={logoFacebook} /></a></li>
            <li><a href="#" className="social-link"><IonIcon icon={logoInstagram} /></a></li>
            <li><a href="#" className="social-link"><IonIcon icon={logoTwitter} /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          &copy; 2025 Fitlife. All Rights Reserved by <a href="#">Daniyal Javadia</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
