import React from "react";

const Navbar = () => {
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
          {/* Left side — can include search or brand */}
          <h4 style={{ margin: 0, fontWeight: "600", color: "#333" }}>Dashboard</h4>

          {/* Right side icons */}
          <ul
            className="navbar-nav topbar-nav ms-md-auto align-items-center"
            style={{ display: "flex", alignItems: "center", margin: 0 }}
          >
            {/* Message Icon */}
            <li
              className="nav-item topbar-icon"
              style={{ listStyle: "none", marginRight: "20px" }}
            >
              <a
                className="nav-link"
                href="#"
                style={{
                  color: "#555",
                  fontSize: "18px",
                  transition: "color 0.3s",
                }}
              >
                <i className="fa fa-envelope"></i>
              </a>
            </li>

            {/* Notification Icon */}
            <li
              className="nav-item topbar-icon"
              style={{ listStyle: "none", marginRight: "20px" }}
            >
              <a
                className="nav-link"
                href="#"
                style={{
                  color: "#555",
                  fontSize: "18px",
                  transition: "color 0.3s",
                }}
              >
                <i className="fa fa-bell"></i>
              </a>
            </li>

            {/* Profile Section */}
            <li
              className="nav-item topbar-user dropdown hidden-caret"
              style={{ listStyle: "none" }}
            >
              <a
                className="dropdown-toggle profile-pic d-flex align-items-center"
                href="#"
                style={{ textDecoration: "none" }}
              >
                <div className="avatar-sm me-2">
                  <img
                    src="/img/profile.jpg"
                    alt="profile"
                    className="avatar-img rounded-circle"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span
                  className="profile-username"
                  style={{ color: "#333", fontSize: "15px" }}
                >
                  <span className="op-7" style={{ color: "#777" }}>
                    Hi,
                  </span>{" "}
                  <span className="fw-bold" style={{ fontWeight: "600" }}>
                    Hizrian
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
