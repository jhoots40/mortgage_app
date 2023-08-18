import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function InterestChart({ mortgage }) {
  const generateData = (mortgage) => {
    let info = [];

    for (var i = 0; i < mortgage.length; i += 12) info.push(mortgage[i]);

    let data = {
      labels: info.map((m) => m.id),
      datasets: [
        {
          label: "Interest",
          data: info.map((m) => m.interest),
          borderColor: "rgba(188, 44, 42, 1)",
          backgroundColor: "rgba(188, 44, 42, 0.5)",
        },
      ],
    };

    return data;
  };

  let options = {
    maintainAspectRatio: false, // This is important to prevent the chart from expanding to full width
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Rate %",
        },
        min: 0,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Line data={generateData(mortgage)} options={options}></Line>
    </div>
  );
}

export default InterestChart;
