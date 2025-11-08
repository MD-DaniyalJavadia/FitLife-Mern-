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
    // Load CSS dynamically
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

    return () => links.forEach((link) => document.head.removeChild(link));
  }, []);

  // ===== Dynamic Count =====
  const totalWorkouts = workouts.length;
  const totalNutrition = nutrition.length;

  // ===== Graph Data Calculation =====
  // Map daily data counts for 7 days
  const getDailyCount = (items) => {
    const counts = Array(7).fill(0);
    items.forEach((item) => {
      const date = new Date(item.createdAt);
      const day = date.getDay(); // 0-6 (Sun-Sat)
      counts[day] += 1;
    });
    return counts;
  };

  const workoutCounts = getDailyCount(workouts);
  const nutritionCounts = getDailyCount(nutrition);

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ===== Combined Chart =====
  const combinedChartData = {
    labels,
    datasets: [
      {
        label: "Workouts",
        data: workoutCounts,
        backgroundColor: "#ff4500",
      },
      {
        label: "Nutrition Entries",
        data: nutritionCounts,
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // ===== Workout Trend =====
  const workoutChartData = {
    labels,
    datasets: [
      {
        label: "Workouts per Day",
        data: workoutCounts,
        borderColor: "#ff4500",
        fill: false,
      },
    ],
  };

  // ===== Nutrition Trend =====
  const nutritionChartData = {
    labels,
    datasets: [
      {
        label: "Meals Logged per Day",
        data: nutritionCounts,
        borderColor: "#4CAF50",
        fill: false,
      },
    ],
  };

  if (loading) return <div className="p-5 text-center">Loading Dashboard...</div>;

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="main-panel">
        <Navbar />
        <div className="container mt-4">
          <h3 className="fw-bold mb-4">Dashboard</h3>

          {/* ===== Top Stats ===== */}
          <div className="row text-center mt-5 ms-3">
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
          <div className="row mt-4">
            <div className="col-md-10 mx-auto">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-3 text-center">Weekly Overview</h5>
                <Bar data={combinedChartData} />
              </div>
            </div>
          </div>

          {/* ===== Separate Graphs ===== */}
          <div className="row mt-4 ms-2">
            <div className="col-md-6">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-3 text-center">Workout Progress</h5>
                <Line data={workoutChartData} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3 shadow-sm">
                <h5 className="mb-3 text-center">Nutrition Trend</h5>
                <Line data={nutritionChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
