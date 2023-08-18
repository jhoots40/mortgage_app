import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function BalanceChart({ mortgage }) {
  let data = {
    labels: mortgage.map((i) => i.id),
    datasets: [
      {
        fill: true,
        label: "Remaining Principal",
        data: mortgage.map((i) => i.remaining),
        borderColor: "rgba(77, 110, 208, 1)",
        backgroundColor: "rgba(77, 110, 208, 0.5)",
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
          text: "Payment",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return Number(value / 1000) + "K";
          },
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

export default BalanceChart;
