import React from "react";
import Transactions from "./homePages/Transactions";
import Budgets from "./homePages/Budgets";

export default function TabPanel({ tab }) {
  switch (tab) {
    case "overview":
      return <div>Overview Content</div>;
    case "transactions":
      return <Transactions />;
    case "budgets":
      return  <Budgets />;
    case "pots":
      return <div>Pots Content</div>;
    case "recurring bills":
      return <div>recurring bills Content</div>;
    default:
      return <div>Select a tab</div>;
  }
}