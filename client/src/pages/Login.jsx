import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Auth.css";

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:3000/api/routes/login", {
        UserEmail: email,
        UserPassword: password,
      });

      // If login is successful
      alert(response.data); // Alert the success message from the backend
      navigate("/dashboard"); // Navigate to the dashboard or home page after successful login
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials, please try again!"); // Show error if login fails
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>Login to Fitlife</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Set the email state
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Set the password state
            />
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
