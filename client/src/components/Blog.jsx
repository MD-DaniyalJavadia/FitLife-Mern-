import React from "react";
import { Link } from 'react-router-dom';
const Blog = () => {
  return (
    <section className="section blog" id="blog" aria-label="blog">
      <div
        className="container cta-section"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '3rem',
          gap: '2rem'
        }}
      >
        {/* Text Content */}
        <div className="cta-text" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Start tracking your fitness journey with us!
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Join <b style={{ color: 'red' }}>Fitlife</b> today and take the first step toward achieving your health and fitness goals.
          </p>
          <Link
            to="/register"
            className="btn btn-primary"
            style={{
              padding: '0.75rem 2rem',
              fontWeight: 'bold',
              backgroundColor: '#ff4d1a',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Image Banner */}
        <div
          className="cta-banner has-after"
          style={{ position: 'relative', flex: 1, maxWidth: '660px' }}
        >
          {/* Main Image */}
          <img
            src="./assets/images/about-banner.png"
            width="660"
            height="648"
            loading="lazy"
            alt="Fitness banner"
            className="w-100"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />

          {/* Decorative Circles */}
          <img
            src="./assets/images/about-circle-one.png"
            width="660"
            height="534"
            loading="lazy"
            aria-hidden="true"
            alt=""
            className="circle circle-1"
            style={{
              position: 'absolute',
              top: 0,
              left: '-50px',
              pointerEvents: 'none'
            }}
          />
          <img
            src="./assets/images/about-circle-two.png"
            width="660"
            height="534"
            loading="lazy"
            aria-hidden="true"
            alt=""
            className="circle circle-2"
            style={{
              position: 'absolute',
              bottom: 0,
              right: '-50px',
              pointerEvents: 'none'
            }}
          />

          {/* Optional extra fitness image */}
          <img
            src="./assets/images/fitness.png"
            width="650"
            height="154"
            loading="lazy"
            alt="fitness"
            className="abs-img w-100"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
