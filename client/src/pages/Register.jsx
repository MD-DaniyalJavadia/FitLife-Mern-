import axios from "axios";
import React, { useState } from 'react';
import { Link ,useNavigate} from "react-router-dom";
import "../assets/css/Auth.css"; 

const Register = () => {
  // State to manage form data
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate(); // To navigate to login page after registration

  // Handle the form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Sending the form data to the backend for registration
      const response = await axios.post("http://localhost:3000/api/routes/register", {
        UserName: userName,
        UserEmail: userEmail,
        UserPassword: userPassword,
      });

      // If the registration is successful
      alert(response.data); // Show success message
      navigate("/login"); // Navigate to login page after successful registration
    } catch (error) {
      console.error(error);
      alert("Error registering user. Please try again.");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2>Create Your Fitlife Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Set the userName state
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)} // Set the userEmail state
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)} // Set the userPassword state
            />
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
