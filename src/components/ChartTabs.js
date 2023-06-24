import React from "react";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";

function ChartTabs() {
  function handleChange() {}
  return (
    <AppBar position="static" color="primary">
      <Tabs value={45} onChange={handleChange} aria-label=""></Tabs>
    </AppBar>
  );
}

export default ChartTabs;
