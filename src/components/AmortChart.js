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

function AmortChart({ mortgage }) {
  const generateData = (mortgage) => {
    let info = [];

    for (var i = 0; i < mortgage.length; i += 12) {
      info.push(mortgage[i]);
      if (i + 12 >= mortgage.length) info.push(mortgage[mortgage.length - 1]);
    }

    let data2 = {
      labels: info.map((i) => i.id),
      datasets: [
        {
          fill: true,
          label: "Principal",
          data: info.map((i) => i.prin_payment),
          borderColor: "rgba(77, 110, 208, 1)",
          backgroundColor: "rgba(77, 110, 208, 0.5)",
        },
        {
          fill: true,
          label: "Interest",
          data: info.map((i) => i.int_payment),
          borderColor: "rgba(188, 44, 42, 1)",
          backgroundColor: "rgba(188, 44, 42, 0.5)",
        },
      ],
    };

    return data2;
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
            return "$" + value;
          },
        },
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
      <Line data={generateData(mortgage)} options={options} />
    </div>
  );
}

export default AmortChart;
