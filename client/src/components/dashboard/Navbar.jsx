// src/components/dashboard/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Navbar = () => {
  const [user, setUser] = useState({ name: "Guest", email: "", profilePic: "/img/profile.jpg" });
  const [loading, setLoading] = useState(true);

  // Fetch current user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me"); // ← Apna backend endpoint
        setUser({
          name: res.data.name || "User",
          email: res.data.email || "",
          profilePic: res.data.profilePic || "/img/profile.jpg",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ name: "Guest", email: "", profilePic: "/img/profile.jpg" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="main-header">
      <nav
        className="navbar navbar-header navbar-expand-lg border-bottom"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "10px 20px",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left side */}
          <h4 style={{ margin: 0, fontWeight: "600", color: "#333" }}>Dashboard</h4>

          {/* Right side icons */}
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            {/* Message */}
            <li className="nav-item topbar-icon" style={{ marginRight: "20px" }}>
              <a href="#" className="nav-link" style={{ color: "#555", fontSize: "18px" }}>
                <i className="fa fa-envelope"></i>
              </a>
            </li>

            {/* Notification */}
            <li className="nav-item topbar-icon" style={{ marginRight: "20px" }}>
              <a href="#" className="nav-link" style={{ color: "#555", fontSize: "18px" }}>
                <i className="fa fa-bell"></i>
              </a>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item topbar-user dropdown">
              <Link
                to="/profile"
                className="dropdown-toggle profile-pic d-flex align-items-center"
                style={{ textDecoration: "none" }}
              >
                <div className="avatar-sm me-2">
                  <img
                    src={user.profilePic}
                    alt="profile"
                    className="avatar-img rounded-circle"
                    style={{ width: "35px", height: "35px", objectFit: "cover" }}
                  />
                </div>
                <span className="profile-username" style={{ color: "#333", fontSize: "15px" }}>
                  <span className="op-7" style={{ color: "#777" }}>Hi,</span>{" "}
                  <span className="fw-bold">{loading ? "..." : user.name}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;