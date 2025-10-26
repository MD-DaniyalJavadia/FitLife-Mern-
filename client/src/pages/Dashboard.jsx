import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import UserStatistics from "../components/dashboard/UserStatistics";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    const styles = [
      "/admin/css/bootstrap.min.css",
      "/admin/css/plugins.min.css",
      "/admin/css/kaiadmin.min.css",
      "/admin/css/demo.css",
      "/admin/css/fonts.min.css",
    ];
    const links = styles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((link) => document.head.removeChild(link));
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="container">
          <h3>Dashboard</h3>
          <button onClick={handleLogout}>Logout</button>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <StatsCard icon="fa-users" color="primary" category="Visitors" title="1,294" />
            </div>
            <div className="col-md-8">
              <UserStatistics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
