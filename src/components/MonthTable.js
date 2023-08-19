import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const columns = [
  {
    id: "month",
    label: "Month",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(186, 137, 86)",
  },
  {
    id: "interest",
    label: "Interest",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(188, 44, 42)",
  },
  {
    id: "principal",
    label: "Principal",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(77, 110, 208)",
  },
  {
    id: "total",
    label: "Total",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(86, 133, 63)",
  },
  {
    id: "ltv",
    label: "LTV",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(77, 110, 208)",
  },
  {
    id: "balance",
    label: "Balance",
    minWidth: "16.666%",
    align: "left",
    color: "rgb(86, 133, 63)",
  },
];

function MonthTable({ mortgage }) {
  const startYear = useSelector((state) => state.start_year);
  const totalYears = useSelector((state) => state.years);
  const principal = useSelector((state) => state.principal);
  const start_month = useSelector((state) => state.start_month);

  const [year, setYear] = useState(startYear);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (startYear > year) setYear(startYear);
    if (startYear + totalYears < year) setYear(startYear + totalYears);
    let arr = [];
    if (year === startYear) {
      for (let i = 0; i < 12 - mortgage[0].month_idx; i++) {
        arr.push(mortgage[i]);
      }
    } else if (year === startYear + totalYears) {
      for (
        let i = mortgage.length - mortgage[0].month_idx;
        i < mortgage.length;
        i++
      ) {
        arr.push(mortgage[i]);
      }
    } else {
      let startMonth = mortgage[0].month_idx;
      let startIndex = (year - startYear) * 12 - startMonth;
      if (startIndex > 0 && startIndex < mortgage.length) {
        for (let i = 0; i < 12; i++) {
          arr.push(mortgage[startIndex + i]);
        }
      }
    }
    setCurrentData(arr);
  }, [year, startYear, totalYears, mortgage]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h2 style={{ color: "rgb(186, 137, 86)", margin: 0 }}>{year}</h2>
        <Box sx={{ width: "75%", mt: 2, mx: "12.5%" }}>
          <Slider
            defaultValue={year}
            value={year}
            min={startYear}
            max={
              start_month === 0
                ? startYear + totalYears - 1
                : startYear + totalYears
            }
            valueLabelDisplay="off"
            color="gold"
            step={1}
            onChange={(e) => {
              setYear(e.target.value);
              setCurrentData([]);
              //generateTable(e.target.value);
            }}
            size="medium"
          />
        </Box>
        <TableContainer
          component={Paper}
          sx={{ height: 350, maxHeight: "100%", overflow: "auto" }}
        >
          <Table stickyHeader size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    sx={{
                      minWidth: column.minWidth,
                      color: column.color,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((val) => (
                <TableRow
                  key={val.month}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    maxHeight: 10,
                  }}
                  size="small"
                >
                  <TableCell align="center">{val.month}</TableCell>
                  <TableCell align="center">
                    {val.int_payment.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {val.prin_payment.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {(val.int_payment + val.prin_payment).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {((val.remaining / principal) * 100).toFixed(1)}
                  </TableCell>
                  <TableCell align="center">
                    {val.remaining.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}

export default MonthTable;
