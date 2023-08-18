import React from "react";
import "./AnnualTable.css";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

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
  const principal = useSelector((state) => state.principal);

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
                  {val.interest_paid.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {val.principal_paid.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {(val.principal_paid + val.interest_paid).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  {((val.remaining_principal / principal) * 100).toFixed(1)}
                </TableCell>
                <TableCell align="center">
                  {val.remaining_principal.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AnnualTable;
