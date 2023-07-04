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
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  let options = {
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

  return <Line data={data} options={options}></Line>;
}

export default BalanceChart;
