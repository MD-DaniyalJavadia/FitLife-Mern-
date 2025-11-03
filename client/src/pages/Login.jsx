import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          UserEmail: email.trim(),
          UserPassword: password,
        },
        { withCredentials: true } // for JWT cookie
      );

      // backend should return JWT or success message
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        //alert("Login Successful!");
        navigate("/dashboard");
      } else {
        //alert(response.data || "Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data)
        alert(error.response.data);
      else alert("Invalid credentials, try again!");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2 className="auth-title">Login to FitLife</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don’t have an account?{" "}
          <Link to="/register" className="switch-link">
            Register here
          </Link>
        </p>

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Login;
