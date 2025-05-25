import React from "react";
import Transactions from "./homePages/Transactions";

export default function TabPanel({ tab }) {
  switch (tab) {
    case "overview":
      return <div>Overview Content</div>;
    case "transactions":
      return <Transactions />;
    case "budgets":
      return <div>Budgets Content</div>;
    case "pots":
      return <div>Pots Content</div>;
    case "recurring bills":
      return <div>recurring bills Content</div>;
    default:
      return <div>Select a tab</div>;
  }
}