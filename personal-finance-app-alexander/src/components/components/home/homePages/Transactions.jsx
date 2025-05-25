import React from "react";
import {PageHeader} from "./homePagesUi/PageHeader";
import {TransactionsTable} from "./homePagesUi/TransactionsTable";


const sampleData = [
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "alex",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
];

export default function Transactions() {
  return (
    <>
      <div className="row">
        <div className="col">
          <PageHeader>Transactions</PageHeader>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container">
            {/* Placeholder for future transaction components */}
            <TransactionsTable data={sampleData} />
          </div>
        </div>
      </div>
    </>
  );
}