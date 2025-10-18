import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Auth.css"; 

const Register = () => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>Create Your Fitlife Account</h2>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/login" className="switch-link">Login here</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </section>
  );
};

export default Register;
