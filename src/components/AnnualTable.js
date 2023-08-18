import React from "react";
import "./AnnualTable.css";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "year",
    label: "Year",
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

function AnnualTable({ mortgage }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "440px" }}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{
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
            {mortgage.map((val) => (
              <TableRow
                key={val.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{val.id}</TableCell>
                <TableCell align="center">
                  {val.int_payment.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {val.prin_payment.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {(val.int_payment + val.prin_payment).toFixed(2)}
                </TableCell>
                <TableCell align="center">{0}</TableCell>
                <TableCell align="center">{val.remaining.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  /*return (
    <div className="App">
      <table>
        <tr>
          <th>Year</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Total</th>
          <th>LTV</th>
          <th>Balance</th>
        </tr>
        {mortgage.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.prin_payment}</td>
              <td>{val.int_payment}</td>
              <td>{val.remaining}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );*/
}

export default AnnualTable;
