import React from "react";
import "./AnnualTable.css";

function AnnualTable({ mortgage }) {
  return (
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
  );
}

export default AnnualTable;
