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
import MonthTable from "./MonthTable";
import PaymentTable from "./PaymentTable";
import LoanData from "./LoanData";
import { generateMortgage } from "../utils/generateData";
import { Box } from "@mui/system";

function ChartTabs() {
  const dispatch = useDispatch();
  const [selectLeft, setSelectLeft] = useState(0);
  const [selectRight, setSelectRight] = useState(0);
  const [selectBottom, setSelectBottom] = useState(0);

  const principal = useSelector((state) => state.principal);
  const years = useSelector((state) => state.years);
  const interest = useSelector((state) => state.interest);
  const int_tens = useSelector((state) => state.int_tens);
  const int_hund = useSelector((state) => state.int_hund);
  const int_thou = useSelector((state) => state.int_thou);
  const startYear = useSelector((state) => state.start_year);
  const startMonth = useSelector((state) => state.start_month);
  const monthlyMortgage = useSelector((state) => state.monthlyMortgage);
  const yearlyMortgage = useSelector((state) => state.yearlyMortgage);

  useEffect(() => {
    generateMortgage(
      principal,
      years,
      interest,
      int_tens,
      int_hund,
      int_thou,
      startYear,
      startMonth,
      dispatch
    );
  }, [
    principal,
    years,
    interest,
    int_tens,
    int_hund,
    int_thou,
    startYear,
    startMonth,
    dispatch,
  ]);

  const handleLeft = (event, newValue) => {
    setSelectLeft(newValue);
  };

  const handleRight = (event, newValue) => {
    setSelectRight(newValue);
  };

  const handleBottom = (event, newValue) => {
    setSelectBottom(newValue);
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
            <AmortChart mortgage={monthlyMortgage}></AmortChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={1}>
            <PieChart mortgage={monthlyMortgage}></PieChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={2}>
            <BalanceChart mortgage={monthlyMortgage}></BalanceChart>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={3}>
            <InterestChart mortgage={monthlyMortgage}></InterestChart>
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
            <AnnualTable mortgage={yearlyMortgage}></AnnualTable>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={1}>
            <MonthTable mortgage={monthlyMortgage}></MonthTable>
          </TabPanel>
          <TabPanel sx={{ height: 440, textAlign: "center" }} value={2}>
            <PaymentTable mortgage={monthlyMortgage}></PaymentTable>
          </TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={3}
          ></TabPanel>
        </TabContext>
      </div>
      <Box
        sx={{
          mt: "550px",
          paddingLeft: "1%",
          paddingRight: "1%",
        }}
      >
        <TabContext value={selectBottom}>
          <Tabs
            value={selectBottom}
            onChange={handleBottom}
            centered
            variant="fullWidth"
          >
            <Tab label="Loan Data" value={0} />
            <Tab label="Expenses" value={1} />
            <Tab label="Prepayment" value={2} />
            <Tab label="Extra" value={3} />
            <Tab label="Fixed" value={4} />
            <Tab label="Interest" value={5} />
            <Tab label="ARM" value={6} />
          </Tabs>
          <TabPanel sx={{ height: 220, textAlign: "center" }} value={0}>
            <LoanData></LoanData>
          </TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={1}
          ></TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={2}
          ></TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={3}
          ></TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={4}
          ></TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={5}
          ></TabPanel>
          <TabPanel
            sx={{ height: 440, textAlign: "center" }}
            value={6}
          ></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default ChartTabs;
