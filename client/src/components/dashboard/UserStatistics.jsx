import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const UserStatistics = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "#177dff",
        backgroundColor: "rgba(23, 125, 255, 0.14)",
      },
    ],
  };

  return (
    <div className="card card-round">
      <div className="card-header">
        <div className="card-head-row">
          <div className="card-title">User Statistics</div>
        </div>
      </div>
      <div className="card-body">
        <div className="chart-container" style={{ minHeight: "375px" }}>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;