import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import "./ChartTabs.css";
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function ChartTabs() {
  const [selectLeft, setSelectLeft] = useState("1");
  const [selectRight, setSelectRight] = useState("1");

  const handleLeft = (event, newValue) => {
    setSelectLeft(newValue);
  };

  const handleRight = (event, newValue) => {
    setSelectRight(newValue);
  };

  return (
    <>
      <div className="left-tabs">
        <TabContext value={selectLeft}>
          <Tabs
            value={selectLeft}
            onChange={handleLeft}
            centered
            variant="fullWidth"
          >
            <Tab label="Amort" value="1" />
            <Tab label="Repay" value="2" />
            <Tab label="Balance" value="3" />
            <Tab label="Interest" value="4" />
          </Tabs>
          <TabPanel value="1">
            <Pie data={data}></Pie>
          </TabPanel>
          <TabPanel value="2">
            <Line data={data2} />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
        </TabContext>
      </div>
      <div className="right-tabs">
        <Tabs
          value={selectRight}
          onChange={handleRight}
          centered
          variant="fullWidth"
        >
          <Tab label="Annual" />
          <Tab label="Monthly" />
          <Tab label="Payments" />
          <Tab label="Summary" />
        </Tabs>
      </div>
    </>
  );
}

export default ChartTabs;
