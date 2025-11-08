// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import api from "../api/axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  const fetchDashboardData = async () => {
    try {
      const [workoutsRes, nutritionRes] = await Promise.all([
        api.get("/api/workouts"),
        api.get("/api/nutrition"),
      ]);
      setWorkouts(workoutsRes.data);
      setNutrition(nutritionRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load KaiAdmin CSS
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

    fetchDashboardData();

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // ===== Dynamic Count =====
  const totalWorkouts = workouts.length;
  const totalNutrition = nutrition.length;

  // ===== FIXED: getDailyCount – Supports both 'createdAt' and 'date' =====
  const getDailyCount = (items, dateField = "createdAt") => {
    const counts = Array(7).fill(0);
    items.forEach((item) => {
      const dateStr = item[dateField] || item.date;
      if (!dateStr) return;

      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return;

      const day = date.getDay(); // 0-6 (Sun-Sat)
      counts[day] += 1;
    });
    return counts;
  };

  const workoutCounts = getDailyCount(workouts, "createdAt");
  const nutritionCounts = getDailyCount(nutrition, "date");

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ===== Chart Data =====
  const combinedChartData = {
    labels,
    datasets: [
      {
        label: "Workouts",
        data: workoutCounts,
        backgroundColor: "#ff4500",
        borderColor: "#ff4500",
        borderWidth: 1,
      },
      {
        label: "Nutrition Entries",
        data: nutritionCounts,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
    ],
  };

  const workoutChartData = {
    labels,
    datasets: [
      {
        label: "Workouts per Day",
        data: workoutCounts,
        borderColor: "#ff4500",
        backgroundColor: "rgba(255, 69, 0, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const nutritionChartData = {
    labels,
    datasets: [
      {
        label: "Meals Logged per Day",
        data: nutritionCounts,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Chart Options (Common)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 12 } } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
  };

  if (loading) {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main-panel">
        <Navbar />
        <div className="container mt-4">
          <h3 className="fw-bold mb-4">Dashboard</h3>

          {/* ===== Top Stats ===== */}
          <div className="row text-center mt-5 ms-2">
            <div className="col-sm-6 col-md-3 mb-3">
              <StatsCard
                icon="fa-dumbbell"
                color="danger"
                category="Workouts"
                title={totalWorkouts}
              />
            </div>
            <div className="col-sm-6 col-md-3 mb-3">
              <StatsCard
                icon="fa-utensils"
                color="success"
                category="Nutrition"
                title={totalNutrition}
              />
            </div>
          </div>

          {/* ===== Combined Graph ===== */}
          <div className="row mt-4 ms-2">
            <div className="col-12">
              <div className="card shadow-sm" style={{ height: "420px", overflow: "hidden" }}>
                <div className="card-body p-3 d-flex flex-column">
                  <h5 className="mb-3 text-center text-primary">Weekly Overview</h5>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <Bar data={combinedChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Separate Graphs ===== */}
          <div className="row mt-4 g-3 ms-2">
            <div className="col-md-6">
              <div className="card shadow-sm" style={{ height: "380px", overflow: "hidden" }}>
                <div className="card-body p-3 d-flex flex-column">
                  <h5 className="mb-3 text-center text-danger">Workout Progress</h5>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <Line data={workoutChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm" style={{ height: "380px", overflow: "hidden" }}>
                <div className="card-body p-3 d-flex flex-column">
                  <h5 className="mb-3 text-center text-success">Nutrition Trend</h5>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <Line data={nutritionChartData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;