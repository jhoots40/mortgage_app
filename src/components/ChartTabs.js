import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import "./ChartTabs.css";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
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
  const [selectLeft, setSelectLeft] = useState(0);
  const [selectRight, setSelectRight] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);

  const principal = useSelector((state) => state.principal);
  const years = useSelector((state) => state.years);
  const interest = useSelector((state) => state.interest);
  const int_tens = useSelector((state) => state.int_tens);
  const int_hund = useSelector((state) => state.int_hund);
  const int_thou = useSelector((state) => state.int_thou);

  let data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [interestPaid, principalPaid],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // Function to run when any of the state values change
    let totalInterest =
      interest +
      Number(int_tens / 10) +
      Number(int_hund / 100) +
      Number(int_thou / 1000);
    totalInterest /= 100;

    let monthlyInterestRate = totalInterest / 12;
    let numberOfPayments = years * 12;
    let monthlyPaymentCalc =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    let remainingPrincipal = principal;
    console.log(monthlyPaymentCalc);

    let totInterest = 0;
    let totPrincipal = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      let interestPayment = remainingPrincipal * monthlyInterestRate;
      totInterest += interestPayment;
      let principalPayment = monthlyPaymentCalc - interestPayment;
      totPrincipal += principalPayment;
      remainingPrincipal -= principalPayment;
      /*console.log(
        "Payment " +
          i +
          " - Principal: $" +
          Math.round(principalPayment * 100) / 100 +
          ", Interest: $" +
          Math.round(interestPayment * 100) / 100 +
          ", Remaining Principal: $" +
          Math.round(remainingPrincipal * 100) / 100 +
          "."
      );*/
    }

    setInterestPaid(totInterest);
    setPrincipalPaid(totPrincipal);
  }, [principal, years, interest, int_tens, int_hund, int_thou]);

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
            <Tab label="Amort" value={0} />
            <Tab label="Repay" value={1} />
            <Tab label="Balance" value={2} />
            <Tab label="Interest" value={3} />
          </Tabs>
          <TabPanel value={0}>
            <Pie data={data}></Pie>
          </TabPanel>
          <TabPanel value={1}>
            <Line data={data2} />
          </TabPanel>
          <TabPanel value={2}>Item Three</TabPanel>
          <TabPanel value={3}>Item Four</TabPanel>
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
