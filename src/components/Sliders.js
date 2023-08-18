import React from "react";
import Slider from "@mui/material/Slider";
import "./Sliders.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { actions } from "../store";
import { useSelector, useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const principal = useSelector((state) => state.principal);
  const payment = useSelector((state) => state.payment);
  const interest = useSelector((state) => state.interest);
  const tens = useSelector((state) => state.int_tens);
  const hundreds = useSelector((state) => state.int_hund);
  const thousands = useSelector((state) => state.int_thou);
  const years = useSelector((state) => state.years);
  const month = useSelector((state) => state.start_month);
  const startYear = useSelector((state) => state.start_year);

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
          onChange={(e) => dispatch(actions.setPrincipal(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setInterest(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setTens(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setHund(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setThou(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setYears(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
        />
        <p>Years</p>
      </div>
      <div className="start-month">
        <p align="center">{months[month]}</p>
        <Slider
          defaultValue={5}
          min={0}
          max={11}
          valueLabelDisplay="off"
          color="gold"
          onChange={(e) => dispatch(actions.setStartMonth(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
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
          onChange={(e) => dispatch(actions.setStartYear(e.target.value))}
          sx={{ margin: 0, padding: 0 }}
        />
        <p>Start Year</p>
      </div>
      <div className="principal">
        <p align="center">{payment}</p>
        <Slider
          defaultValue={payment}
          value={payment}
          min={0}
          max={2500}
          valueLabelDisplay="off"
          color="green"
          onChange={(e) => dispatch(actions.setPayment(e.target.value))}
          step={10}
          sx={{ margin: 0, padding: 0 }}
        />
        <p>Payment</p>
      </div>
    </ThemeProvider>
  );
}

export default Sliders;
