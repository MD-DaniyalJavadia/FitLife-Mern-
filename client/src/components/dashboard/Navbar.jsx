import React from "react";

const Navbar = () => {
  return (
    <div className="main-header">
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          {/* Add search, notifications, profile as per original */}
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <a className="nav-link dropdown-toggle" href="#" id="messageDropdown">
                <i className="fa fa-envelope"></i>
              </a>
              {/* Dropdown content */}
            </li>
            {/* Add other icons */}
            <li className="nav-item topbar-user dropdown hidden-caret">
              <a className="dropdown-toggle profile-pic" href="#">
                <div className="avatar-sm">
                  <img src="/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span> <span className="fw-bold">Hizrian</span>
                </span>
              </a>
              {/* Dropdown content */}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;