import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import "./ChartTabs.css";
import { useSelector, useDispatch } from "react-redux";
import PieChart from "./PieChart";
import AmortChart from "./AmortChart";
import BalanceChart from "./BalanceChart";
import InterestChart from "./InterestChart";
import AnnualTable from "./AnnualTable";
import { actions } from "../store";

function ChartTabs() {
  const dispatch = useDispatch();
  const [selectLeft, setSelectLeft] = useState(0);
  const [selectRight, setSelectRight] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [mortgage, setMortgage] = useState([]);
  const [totInterest, setTotInterest] = useState(0);

  const principal = useSelector((state) => state.principal);
  const years = useSelector((state) => state.years);
  const interest = useSelector((state) => state.interest);
  const int_tens = useSelector((state) => state.int_tens);
  const int_hund = useSelector((state) => state.int_hund);
  const int_thou = useSelector((state) => state.int_thou);

  useEffect(() => {
    // Function to run when any of the state values change
    let totalInterest =
      interest +
      Number(int_tens / 10) +
      Number(int_hund / 100) +
      Number(int_thou / 1000);
    totalInterest /= 100;

    setTotInterest(totalInterest);

    let monthlyInterestRate = totalInterest / 12;
    let numberOfPayments = years * 12;
    let monthlyPaymentCalc =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    let remainingPrincipal = principal;
    dispatch(actions.setPayment(parseInt(monthlyPaymentCalc)));

    let totInterest = 0;
    let totPrincipal = 0;

    let mortgageInfo = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      let interestPayment = remainingPrincipal * monthlyInterestRate;
      totInterest += interestPayment;
      let principalPayment = monthlyPaymentCalc - interestPayment;
      totPrincipal += principalPayment;
      remainingPrincipal -= principalPayment;

      if (i % 12 === 0) {
        let toAdd = {
          id: i / 12 + 2023,
          prin_payment: principalPayment,
          int_payment: interestPayment,
          remaining: remainingPrincipal,
        };
        mortgageInfo.push(toAdd);
      }
    }

    setInterestPaid((totInterest / (totInterest + totPrincipal)) * 100);
    setPrincipalPaid((totPrincipal / (totInterest + totPrincipal)) * 100);
    setMortgage(mortgageInfo);
    console.log(mortgageInfo);
  }, [principal, years, interest, int_tens, int_hund, int_thou, dispatch]);

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
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={0}>
            <AmortChart mortgage={mortgage}></AmortChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={1}>
            <PieChart
              interestPaid={interestPaid}
              principalPaid={principalPaid}
            ></PieChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={2}>
            <BalanceChart mortgage={mortgage}></BalanceChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={3}>
            <InterestChart
              interest={totInterest}
              years={mortgage.map((i) => i.id)}
            ></InterestChart>
          </TabPanel>
        </TabContext>
      </div>
      <div className="right-tabs">
        <TabContext value={selectRight}>
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
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={0}>
            <AnnualTable mortgage={mortgage}></AnnualTable>
          </TabPanel>
          <TabPanel value={1}></TabPanel>
          <TabPanel value={2}></TabPanel>
          <TabPanel value={3}></TabPanel>
        </TabContext>
      </div>
    </>
  );
}

export default ChartTabs;
