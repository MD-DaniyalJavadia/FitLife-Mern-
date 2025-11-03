import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebar" data-background-color="dark">
      {/* Logo Section */}
      <div
        className="sidebar-logo"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80px", // Adjust this to your sidebar header height
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
              color: "#4CAF50", // green accent
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

            <li className="nav-item">
              <Link to="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
