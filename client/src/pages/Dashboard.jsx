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
    link.href = href;  // absolute path
    document.head.appendChild(link);
    return link;
  });

  return () => {
    links.forEach((link) => document.head.removeChild(link));
  };
}, []);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="container">
          <div className="page-inner">
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
              <div>
                <h3 className="fw-bold mb-3">Dashboard</h3>
                <h6 className="op-7 mb-2">Free Bootstrap 5 Admin Dashboard</h6>
              </div>
              <div className="ms-md-auto py-2 py-md-0">
                <a href="#" className="btn btn-label-info btn-round me-2">Manage</a>
                <a href="#" className="btn btn-primary btn-round">Add Customer</a>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-md-3">
                <StatsCard icon="fa-users" color="primary" category="Visitors" title="1,294" />
              </div>
              <div className="col-sm-6 col-md-3">
                <StatsCard icon="fa-user-check" color="info" category="Subscribers" title="1303" />
              </div>
              <div className="col-sm-6 col-md-3">
                <StatsCard icon="fa-luggage-cart" color="success" category="Sales" title="$ 1,345" />
              </div>
              <div className="col-sm-6 col-md-3">
                <StatsCard icon="far fa-check-circle" color="secondary" category="Order" title="576" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <UserStatistics />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
        <footer />
      </div>
    </div>
  );
};

export default Dashboard;
