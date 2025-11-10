import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call backend logout route
      await axios.post(
        "http://localhost:3000/api/auth/logout", // <-- adjust URL if needed
        {},
        { withCredentials: true }
      );
    localStorage.removeItem("token");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="sidebar" data-background-color="dark">
      {/* Logo Section */}
      <div
        className="sidebar-logo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80px",
          backgroundColor: "#1a1a2e",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Link
          to="/dashboard"
          className="logo"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#4CAF50",
              letterSpacing: "1px",
            }}
          >
            Fit
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#fff",
              marginLeft: "5px",
            }}
          >
            Life
          </span>
        </Link>
      </div>

      {/* Sidebar Links */}
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className={`nav-item ${isActive("/dashboard")}`}>
              <Link to="/dashboard">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/workouts")}`}>
              <Link to="/workouts">
                <i className="fas fa-dumbbell"></i>
                <p>Workouts</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/nutrition")}`}>
              <Link to="/nutrition">
                <i className="fas fa-apple-alt"></i>
                <p>Nutrition</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/progress")}`}>
              <Link to="/progress">
                <i className="fas fa-chart-line"></i>
                <p>Progress</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/profile")}`}>
              <Link to="/profile">
                <i className="fas fa-user"></i>
                <p>Profile</p>
              </Link>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <a href="#!" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
