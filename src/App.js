import "./App.css";
import React from "react";
//import Slider from "@mui/material/Slider";
import Sliders from "./components/Sliders";
import ChartTabs from "./components/ChartTabs";

function App() {
  return (
    <div className="container">
      <h3>Mortgage Calculator Clone</h3>
      <Sliders />
      <ChartTabs />
    </div>
  );
}

export default App;
