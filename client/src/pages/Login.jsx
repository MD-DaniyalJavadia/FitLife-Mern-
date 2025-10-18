import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Auth.css"; 

const Login = () => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>Login to Fitlife</h2>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <Link to="/register" className="switch-link">Register here</Link>
        </p>

        <Link to="/" className="back-home">← Back to Home</Link>
      </div>
    </section>
  );
};

export default Login;
