import React from "react";
import { PageHeader } from "./homePagesUi/PageHeader";
import { Button } from "../../ui/Button";
import { useSelector } from "react-redux";
import { WhiteCard } from "../../ui/WhiteCard";


// Example budgets array (replace with backend data if needed)
const budgets = [
  { category: "Groceries", max: 500 },
  { category: "Rent", max: 1200 },
  { category: "Entertainment", max: 200 },
  { category: "Utilities", max: 300 },
  { category: "Transport", max: 150 },
  { category: "Other", max: 100 },
];


//
// const API_URL = "http://localhost:5000/api/transactions"; // <-- Backend endpoint


function getCategorySummary(transactions) {
  const summary = {};
  transactions.forEach(tx => {
    if (!summary[tx.category]) summary[tx.category] = 0;
    summary[tx.category] += tx.amount;
  });
  return summary;
}

function getLatestSpending(transactions, category) {
  const filtered = transactions
    .filter(tx => tx.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return filtered[0] || null;
}



export default function Budgets() {
  const transactions = useSelector(state => state.transactions.items);
  const categorySummary = getCategorySummary(transactions);

  return (
    <>
    <div className="row mb-3">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <PageHeader>Budgets</PageHeader>
            <Button className="btn btn-dark mb-3" onClick={() => {} /* Add budget logic here */}>
              add budget
            </Button>
          </div>
        </div>
      </div>


    <div className="row">
      {/* Left: Spending Summary */}
      <div className="col-md-5 ">
      <WhiteCard>
        <div className="card shadow-sm">
          <div className="card-header fw-bold">Spending Summary</div>
          <div className="card-body">
            {Object.entries(categorySummary).map(([cat, amt]) => (
              <div key={cat} className="d-flex justify-content-between mb-2">
                <span>{cat}</span>
                <span>${Math.abs(amt).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </WhiteCard>
      </div>
      {/* Right: Budget Cards */}
      <div className="col-md-7">
        <div className="row">
          {budgets.map(budget => {
            const spent = transactions
              .filter(tx => tx.category === budget.category)
              .reduce((sum, tx) => sum + tx.amount, 0);
            const remaining = budget.max - spent;
            const latest = getLatestSpending(transactions, budget.category);
            return (
                <WhiteCard>
              <div className="col-md-12 " key={budget.category}>
                <div className="card h-100 shadow-sm">
                  <div className="card-header fw-bold">{budget.category}</div>
                  <div className="card-body">
                    <div>Max: ${budget.max.toFixed(2)}</div>
                    <div>Spent: ${Math.abs(spent).toFixed(2)}</div>
                    <div>Remaining: ${remaining.toFixed(2)}</div>
                  </div>
                  {latest && (
                    <div className="card-footer text-muted">
                      Latest: {latest.recipient} - ${Math.abs(latest.amount).toFixed(2)} on {new Date(latest.date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
                </WhiteCard>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}