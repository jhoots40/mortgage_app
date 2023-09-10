import React from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { useState } from "react";

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

function LoanData() {
  const dispatch = useDispatch();
  const principal = useSelector((state) => state.principal);
  const payment = useSelector((state) => state.payment);
  const interest = useSelector((state) => state.interest);
  const tens = useSelector((state) => state.int_tens);
  const hundreds = useSelector((state) => state.int_hund);
  const thousands = useSelector((state) => state.int_thou);
  const years = useSelector((state) => state.years);

  const [down, setDown] = useState("");
  const [downPercentage, setDownPercentage] = useState("");
  const [propertyValue, setPropertyValue] = useState(principal || "");

  function getDecimalDigitsArray(number) {
    const decimalPart = number.toString().split(".")[1];

    if (!decimalPart) {
      return [];
    }

    return decimalPart.split("").map((digit) => parseInt(digit, 10));
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Property Value"
            variant="standard"
            color="blue"
            type="number"
            value={propertyValue}
            inputProps={{
              min: 10000,
              step: 1000,
            }}
            onChange={(e) => {
              setPropertyValue(e.target.value);
              dispatch(actions.setPrincipal(Number(e.target.value) - down));
              setDownPercentage(
                Math.floor((down / e.target.value) * 10000) / 100
              );
            }}
          />
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Principal"
            variant="standard"
            color="blue"
            type="number"
            value={principal}
            inputProps={{
              min: 10000,
              step: 1000,
            }}
            onChange={(e) => {
              dispatch(actions.setPrincipal(e.target.value));
              setPropertyValue(Number(e.target.value) + Number(down));
              setDownPercentage(
                Math.floor(
                  (down / (Number(e.target.value) + Number(down))) * 10000
                ) / 100
              );
            }}
          />
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Payment"
            variant="standard"
            color="green"
            type="number"
            value={payment}
            inputProps={{
              min: 0,
              step: 10,
            }}
            onChange={(e) => dispatch(actions.setPayment(e.target.value))}
            disabled={true}
          />
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Downpayment"
            variant="standard"
            color="blue"
            type="number"
            value={down}
            inputProps={{
              min: 0,
              max: principal,
              step: 1000,
            }}
            onChange={(e) => {
              setDown(e.target.value);
              dispatch(actions.setPrincipal(propertyValue - e.target.value));
              setDownPercentage(
                Math.floor((e.target.value / propertyValue) * 10000) / 100
              );
            }}
          />
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Interest"
            variant="standard"
            color="blue"
            type="number"
            value={
              Math.round(
                ((interest || 0) +
                  (tens || 0) / 10 +
                  (hundreds || 0) / 100 +
                  (thousands || 0) / 1000) *
                  1000
              ) / 1000
            }
            inputProps={{
              min: 0,
              max: 20,
              step: 0.001,
            }}
            onChange={(e) => {
              var rounded = Math.round(e.target.value * 1000) / 1000;
              var arr = getDecimalDigitsArray(rounded);
              dispatch(actions.setInterest(Math.floor(rounded)));
              dispatch(actions.setTens(arr[0] || 0));
              dispatch(actions.setHund(arr[1] || 0));
              dispatch(actions.setThou(arr[2] || 0));
            }}
          />
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Start Date"
            variant="standard"
            color="green"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Downpayment %"
            variant="standard"
            color="blue"
            type="number"
            value={downPercentage}
            inputProps={{
              min: 0,
              max: 99,
              step: 0.001,
            }}
            onChange={(e) => {
              setDownPercentage(e.target.value);
              console.log(Math.round(propertyValue * (e.target.value / 100)));
              setDown(Math.round(propertyValue * (e.target.value / 100)));
              dispatch(
                actions.setPrincipal(propertyValue * (1 - e.target.value / 100))
              );
            }}
          />
          <TextField
            sx={{ width: "25%" }}
            id="standard-basic"
            label="Years"
            variant="standard"
            color="blue"
            type="number"
            value={years}
            inputProps={{
              min: 1,
              max: 50,
              step: 1,
            }}
            onChange={(e) => dispatch(actions.setYears(e.target.value))}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoanData;
