import React
 from "react";

export function parseAmount(amountStr) {
  // Remove $ and commas, keep sign
  return parseFloat(amountStr.replace(/[^0-9.-]+/g, ""));
}