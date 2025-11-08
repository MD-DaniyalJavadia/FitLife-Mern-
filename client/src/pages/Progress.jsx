// src/pages/Progress.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import api from "../api/axios";

const Progress = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMeals: 0,
    weeklyWorkouts: 0,
    weeklyMeals: 0,
    workoutStreak: 0,
    calorieGoal: 2500,
    caloriesLogged: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load KaiAdmin CSS
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

    // Fetch Progress Data
    const fetchProgress = async () => {
      try {
        const [workoutsRes, nutritionRes] = await Promise.all([
          api.get("/api/workouts"),
          api.get("/api/nutrition"),
        ]);

        const workouts = workoutsRes.data;
        const nutrition = nutritionRes.data;

        // Calculate stats
        const totalWorkouts = workouts.length;
        const totalMeals = nutrition.length;

        // Last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyWorkouts = workouts.filter(
          (w) => new Date(w.createdAt) >= oneWeekAgo
        ).length;

        const weeklyMeals = nutrition.filter(
          (n) => new Date(n.date || n.createdAt) >= oneWeekAgo
        ).length;

        // Streak (simplified)
        const today = new Date().toDateString();
        const uniqueDays = new Set(
          workouts.map((w) => new Date(w.createdAt).toDateString())
        );
        const workoutStreak = uniqueDays.size >= 5 ? 5 : uniqueDays.size;

        // Calories
        const caloriesLogged = nutrition.reduce((sum, n) => sum + (n.calories || 0), 0);

        setStats({
          totalWorkouts,
          totalMeals,
          weeklyWorkouts,
          weeklyMeals,
          workoutStreak,
          calorieGoal: 2500,
          caloriesLogged,
        });
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();

    return () => {
      links.forEach((link) => {
        if (document.head.contains(link)) document.head.removeChild(link);
      });
    };
  }, []);

  // Progress Bar Component
  const ProgressBar = ({ label, value, max, color }) => {
    const percentage = Math.min((value / max) * 100, 100);
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted small">{label}</span>
          <span className="text-muted small">
            {value} / {max}
          </span>
        </div>
        <div className="progress" style={{ height: "10px" }}>
          <div
            className={`progress-bar bg-${color}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
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
          <div className="page-inner">
            <h3 className="fw-bold mb-4 text-primary">My Progress</h3>

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6 col-lg-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <i className="fa fa-dumbbell fa-2x text-danger mb-2"></i>
                    <h5 className="mb-1">{stats.totalWorkouts}</h5>
                    <p className="text-muted small mb-0">Total Workouts</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <i className="fa fa-utensils fa-2x text-success mb-2"></i>
                    <h5 className="mb-1">{stats.totalMeals}</h5>
                    <p className="text-muted small mb-0">Meals Logged</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <i className="fa fa-fire fa-2x text-warning mb-2"></i>
                    <h5 className="mb-1">{stats.workoutStreak}</h5>
                    <p className="text-muted small mb-0">Day Streak</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <i className="fa fa-trophy fa-2x text-info mb-2"></i>
                    <h5 className="mb-1">
                      {((stats.weeklyWorkouts / 5) * 100).toFixed(0)}%
                    </h5>
                    <p className="text-muted small mb-0">Weekly Goal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="card shadow-sm">
              <div className="card-header bg-gradient-primary text-white">
                <h5 className="mb-0">Weekly Goals</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-danger mb-3">
                      <i className="fa fa-dumbbell me-2"></i>Workout Target
                    </h6>
                    <ProgressBar
                      label="Workouts this week"
                      value={stats.weeklyWorkouts}
                      max={5}
                      color="danger"
                    />
                    <ProgressBar
                      label="Streak Days"
                      value={stats.workoutStreak}
                      max={7}
                      color="warning"
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success mb-3">
                      <i className="fa fa-utensils me-2"></i>Nutrition Target
                    </h6>
                    <ProgressBar
                      label="Meals Logged"
                      value={stats.weeklyMeals}
                      max={21}
                      color="success"
                    />
                    <ProgressBar
                      label="Daily Calories"
                      value={stats.caloriesLogged}
                      max={stats.calorieGoal}
                      color="info"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div className="mt-4 p-4 bg-light rounded text-center">
              <p className="lead mb-0">
                <strong>Keep it up!</strong> You're{" "}
                {stats.weeklyWorkouts >= 4 ? "crushing" : "on"} your goals this week!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;