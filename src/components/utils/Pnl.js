import React from "react";
import currency from "currency.js";

const getPnlColor = (pnl) => {
  if (pnl > 0) {
    return "green";
  } else if (pnl < 0) {
    return "red";
  } else {
    return "black";
  }
};

const Pnl = ({ value }) => {
  value = parseFloat(value);
  const pnlCurrency = currency(value).format();
  return <div style={{ color: getPnlColor(value) }}>{pnlCurrency}</div>;
};

export default Pnl;
