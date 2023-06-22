import React from "react";
import Slider from "@mui/material/Slider";
import "./Sliders.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    blue: {
      // Purple and green play nicely together.
      main: "#476CD7",
    },
    red: {
      // This is green.A700 as hex.
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
  function handleChange(e) {}

  return (
    <ThemeProvider theme={theme}>
      <p>Principal</p>
      <div className="principal">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="blue"
        />
      </div>
      <p>Interest</p>
      <div className="unit">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="red"
        />
      </div>
      <div className="tenth">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="red"
        />
      </div>

      <div className="hundredth">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="red"
        />
      </div>

      <div className="thousandth">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="red"
        />
      </div>

      <p>Years</p>
      <div className="total-year">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="gold"
        />
      </div>
      <div className="start-month">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="gold"
        />
      </div>
      <div className="start-year">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="gold"
        />
      </div>
      <p>Payment</p>
      <div className="principal">
        <Slider
          defaultValue={25}
          min={0}
          max={50}
          valueLabelDisplay="auto"
          color="green"
        />
      </div>
    </ThemeProvider>
  );
}

export default Sliders;
