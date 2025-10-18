import React from "react";

const About = () => {
  return (
    <section className="section about" id="about" aria-label="about">
      <div className="container">
        <div className="about-banner has-after">
          <img src="./assets/images/about-banner.png" alt="about banner" className="w-100" />
          <img src="./assets/images/about-circle-one.png" alt="" className="circle circle-1" />
          <img src="./assets/images/about-circle-two.png" alt="" className="circle circle-2" />
          <img src="./assets/images/fitness.png" alt="fitness" className="abs-img w-100" />
        </div>

        <div className="about-content">
          <p className="section-subtitle">About Us</p>
          <h2 className="h2 section-title">Welcome to Your All-in-One Fitness Tracker</h2>
          <p className="section-text">
            At <b style={{ color: "red" }}>Fitlife</b>, we believe fitness is about consistency and smart health choices.
          </p>
          <p className="section-text">
            Track workouts, log meals, and stay motivated with real-time analytics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
