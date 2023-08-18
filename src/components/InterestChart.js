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

function InterestChart({ interest, years }) {
  let data = {
    labels: years,
    datasets: [
      {
        label: "Interest",
        data: years.map(() => interest),
        borderColor: "rgba(188, 44, 42, 1)",
        backgroundColor: "rgba(188, 44, 42, 0.5)",
      },
    ],
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
      <Line data={data} options={options}></Line>
    </div>
  );
}

export default InterestChart;
