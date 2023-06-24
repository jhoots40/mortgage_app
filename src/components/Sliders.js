import React from "react";
import Slider from "@mui/material/Slider";
import "./Sliders.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const theme = createTheme({
  palette: {
    blue: {
      main: "#476CD7",
    },
    red: {
      main: "#CB2A1D",
    },
    gold: {
      main: "#C3874C",
    },
    green: {
      main: "#458833",
    },
  },
});

function Sliders() {
  function handleMonths(e) {
    setMonth(months[e.target.value]);
  }

  const [principal, setPrincipal] = useState(100000);
  const [payment, setPayment] = useState(500);
  const [interest, setInterest] = useState(5);
  const [tens, setTens] = useState(0);
  const [hundreds, setHundreds] = useState(0);
  const [thousands, setThousands] = useState(0);
  const [years, setYears] = useState(30);
  const [month, setMonth] = useState("Jun");
  const [startYear, setStartYear] = useState(2023);

  return (
    <ThemeProvider theme={theme}>
      <div className="principal">
        <p align="center">{principal}</p>
        <Slider
          defaultValue={100000}
          min={10000}
          max={500000}
          valueLabelDisplay="off"
          color="blue"
          step={1000}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <p>Principal</p>
      </div>
      <div className="unit">
        <p align="center">{interest}</p>
        <Slider
          defaultValue={5}
          min={0}
          max={20}
          valueLabelDisplay="off"
          color="red"
          onChange={(e) => setInterest(e.target.value)}
        />
        <p>Interest</p>
      </div>
      <div className="tenth">
        <p align="center">{tens}</p>
        <Slider
          defaultValue={0}
          min={0}
          max={9}
          valueLabelDisplay="off"
          color="red"
          onChange={(e) => setTens(e.target.value)}
        />
        <p>.0</p>
      </div>

      <div className="hundredth">
        <p align="center">{hundreds}</p>
        <Slider
          defaultValue={0}
          min={0}
          max={9}
          valueLabelDisplay="off"
          color="red"
          onChange={(e) => setHundreds(e.target.value)}
        />
        <p>.00</p>
      </div>

      <div className="thousandth">
        <p align="center">{thousands}</p>
        <Slider
          defaultValue={0}
          min={0}
          max={9}
          valueLabelDisplay="off"
          color="red"
          onChange={(e) => setThousands(e.target.value)}
        />
        <p>.000</p>
      </div>

      <div className="total-year">
        <p align="center">{years}</p>
        <Slider
          defaultValue={30}
          min={1}
          max={50}
          valueLabelDisplay="off"
          color="gold"
          onChange={(e) => setYears(e.target.value)}
        />
        <p>Years</p>
      </div>
      <div className="start-month">
        <p align="center">{month}</p>
        <Slider
          defaultValue={5}
          min={0}
          max={11}
          valueLabelDisplay="off"
          color="gold"
          onChange={handleMonths}
        />
        <p>Start Month</p>
      </div>
      <div className="start-year">
        <p align="center">{startYear}</p>
        <Slider
          defaultValue={2023}
          min={2003}
          max={2028}
          valueLabelDisplay="off"
          color="gold"
          onChange={(e) => setStartYear(e.target.value)}
        />
        <p>Start Year</p>
      </div>
      <div className="principal">
        <p align="center">{payment}</p>
        <Slider
          defaultValue={500}
          min={0}
          max={2500}
          valueLabelDisplay="off"
          color="green"
          onChange={(e) => setPayment(e.target.value)}
          step={10}
        />
        <p>Payment</p>
      </div>
    </ThemeProvider>
  );
}

export default Sliders;
