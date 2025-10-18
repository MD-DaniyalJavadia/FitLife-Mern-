import React from "react";

const Services = () => {
  return (
    <section
      className="section class bg-dark has-bg-image"
      id="class"
      aria-label="class"
      style={{ backgroundImage: "url('./assets/images/classes-bg.png')" }}
    >
      <div className="container">
        <p className="section-subtitle">Our Services</p>
        <h2 className="h2 section-title text-center">
          Comprehensive Fitness Services For Your Journey
        </h2>

        <ul className="class-list has-scrollbar">
          {/* Card 1 */}
          <li className="scrollbar-item">
            <div className="class-card">
              <figure className="card-banner img-holder" style={{ "--width": 416, "--height": 240 }}>
                <img
                  src="./assets/images/class-1.jpg"
                  width="416"
                  height="240"
                  loading="lazy"
                  alt="Personalized Workout Plans"
                  className="img-cover"
                />
              </figure>

              <div className="card-content">
                <div className="title-wrapper">
                  <img
                    src="./assets/images/class-icon-1.png"
                    width="52"
                    height="52"
                    aria-hidden="true"
                    alt=""
                    className="title-icon"
                  />
                  <h3 className="h3">
                    <a href="#" className="card-title">Personalized Workout Plans</a>
                  </h3>
                </div>
                <p className="card-text">
                  Tailored workout routines designed to fit your individual fitness goals, whether it's weight loss, muscle gain, or overall health improvement.
                </p>
              </div>
            </div>
          </li>

          {/* Card 2 */}
          <li className="scrollbar-item">
            <div className="class-card">
              <figure className="card-banner img-holder" style={{ "--width": 416, "--height": 240 }}>
                <img
                  src="./assets/images/class-2.jpg"
                  width="416"
                  height="240"
                  loading="lazy"
                  alt="Cardio Tracking"
                  className="img-cover"
                />
              </figure>

              <div className="card-content">
                <div className="title-wrapper">
                  <img
                    src="./assets/images/class-icon-2.png"
                    width="52"
                    height="52"
                    aria-hidden="true"
                    alt=""
                    className="title-icon"
                  />
                  <h3 className="h3">
                    <a href="#" className="card-title">Cardio Tracking</a>
                  </h3>
                </div>
                <p className="card-text">
                  Easily track your cardio workouts like running, cycling, and HIIT. Monitor your distance, time, calories burned, and progress over time with detailed analytics to help you stay motivated and reach your fitness goals faster.
                </p>
              </div>
            </div>
          </li>

          {/* Card 3 */}
          <li className="scrollbar-item">
            <div className="class-card">
              <figure className="card-banner img-holder" style={{ "--width": 416, "--height": 240 }}>
                <img
                  src="./assets/images/class-3.jpg"
                  width="416"
                  height="240"
                  loading="lazy"
                  alt="Nutrition Guidance"
                  className="img-cover"
                />
              </figure>

              <div className="card-content">
                <div className="title-wrapper">
                  <img
                    src="./assets/images/class-icon-3.png"
                    width="52"
                    height="52"
                    aria-hidden="true"
                    alt=""
                    className="title-icon"
                  />
                  <h3 className="h3">
                    <a href="#" className="card-title">Nutrition Guidance</a>
                  </h3>
                </div>
                <p className="card-text">
                  Customized meal plans and nutrition tracking to fuel your body properly and complement your fitness journey.
                </p>
              </div>
            </div>
          </li>

          {/* Card 4 */}
          <li className="scrollbar-item">
            <div className="class-card">
              <figure className="card-banner img-holder" style={{ "--width": 416, "--height": 240 }}>
                <img
                  src="./assets/images/class-4.jpg"
                  width="416"
                  height="240"
                  loading="lazy"
                  alt="The Fitness Pack"
                  className="img-cover"
                />
              </figure>

              <div className="card-content">
                <div className="title-wrapper">
                  <img
                    src="./assets/images/class-icon-4.png"
                    width="52"
                    height="52"
                    aria-hidden="true"
                    alt=""
                    className="title-icon"
                  />
                  <h3 className="h3">
                    <a href="#" className="card-title">The Fitness Pack</a>
                  </h3>
                </div>
                <p className="card-text">
                  Suspendisse nisi libero, cursus ac magna sit amet, fermentum imperdiet nisi.
                </p>

                <div className="card-progress">
                  <div className="progress-wrapper">
                    <p className="progress-label">Class Full</p>
                    <span className="progress-value">60%</span>
                  </div>
                  <div className="progress-bg">
                    <div className="progress-bar" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );

};

export default Services;
