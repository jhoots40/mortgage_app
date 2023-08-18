import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ mortgage }) {
  const generateData = (mortgage) => {
    var principal = 0;
    var interest = 0;

    mortgage.forEach((m) => {
      principal += m.prin_payment;
      interest += m.int_payment;
    });

    let data = {
      labels: ["Interest", "Principal"],
      datasets: [
        {
          label: "Percentage Paid",
          data: [
            (interest / (principal + interest)) * 100,
            (principal / (principal + interest)) * 100,
          ],
          backgroundColor: [
            "rgba(188, 44, 42, 0.4)",
            "rgba(77, 110, 208, 0.4)",
          ],
          borderColor: ["rgba(188, 44, 42, 1)", "rgba(77, 110, 208, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const options = {
    maintainAspectRatio: false, // This is important to prevent the chart from expanding to full width
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
      <Pie data={generateData(mortgage)} options={options} />
    </div>
  );
}

export default PieChart;
