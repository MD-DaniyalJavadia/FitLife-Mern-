import React, { useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import UserStatistics from "../components/dashboard/UserStatistics";

const Dashboard = () => {
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

    // Clean up styles when component unmounts
    return () => links.forEach((link) => document.head.removeChild(link));
  }, []);

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-panel">
        <Navbar />
        <div className="container mt-4">
          <h3 className="fw-bold mb-4">Dashboard</h3>

          {/* Stats Row */}
          <div className="row">
            <div className="col-sm-6 col-md-3 mb-3 ms-4 mt-5">
              <StatsCard icon="fa-users" color="primary" category="Visitors" title="1,294" />
            </div>
          </div>

          {/* User Statistics Graph */}
          <div className="row mt-4 ms-2">
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
