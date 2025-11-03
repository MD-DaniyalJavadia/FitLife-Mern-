import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Auth.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          UserName: userName.trim(),
          UserEmail: userEmail.trim(),
          UserPassword: userPassword,
        },
        { withCredentials: true } // include cookies for JWT
      );

      //alert(response.data || "User registered successfully!");
      navigate("/login"); // after register → login
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data)
        alert(error.response.data);
      else alert("Error registering user. Try again.");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2 className="auth-title">Create Your FitLife Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/login" className="switch-link">
            Login here
          </Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Register;
