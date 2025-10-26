import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to="/" className="logo">
            <img
                src="/admin/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item active">
              <Link to="/dashboard">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            {/* Add more links as per original template */}
            <li className="nav-item">
              <Link to="/dashboard/forms">
                <i className="fas fa-pen-square"></i>
                <p>Forms</p>
              </Link>
            </li>
            {/* ... Add other menu items ... */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;