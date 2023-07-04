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
        label: "Remaining Principal",
        data: years.map(() => interest),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        min: 0,
      },
    },
  };

  return (
    <>
      <Line data={data} options={options}></Line>
    </>
  );
}

export default InterestChart;
