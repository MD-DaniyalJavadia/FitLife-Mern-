import React from "react";

const Hero = () => {
  return (
    <section
      className="section hero bg-dark has-after has-bg-image"
      id="home"
      aria-label="hero"
      style={{ backgroundImage: "url('./assets/images/hero-bg.png')" }}
    >
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <strong className="strong">The Best</strong> Fitness Club
          </p>
          <h1 className="h1 hero-title">Work Hard To Get Better Life</h1>
          <p className="section-text">
            Duis mollis felis quis libero dictum vehicula. Duis dictum lorem mi, a faucibus nisi eleifend eu.
          </p>
          <a href="#" className="btn btn-primary">Get Started</a>
        </div>

        <div className="hero-banner">

          <img src="./assets/images/hero-banner.png" width="660" height="753" alt="hero banner" className="w-100" />
          <img src="./assets/images/hero-circle-one.png" alt="" className="circle circle-1" />
          <img src="./assets/images/hero-circle-two.png" alt="" className="circle circle-2" />
          <img src="./assets/images/heart-rate.svg" alt="heart rate" className="abs-img abs-img-1" />
          <img src="./assets/images/calories.svg" alt="calories" className="abs-img abs-img-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
