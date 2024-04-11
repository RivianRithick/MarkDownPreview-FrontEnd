import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style/Chart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const [data, setData] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://markdownpreview-backend.onrender.com/api/user/getUserCount")
      .then((response) => {
        setData({
          totalUsers: response.data.totalUsers,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const chartData = {
    labels: ["User Count"],
    datasets: [
      {
        label: "",
        data: [data.totalUsers],
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 0, 0, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 0, 0, 1)"],
        borderWidth: 2,
        barThickness: 100,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Chart;
