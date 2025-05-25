import React from "react";

export function TransactionsTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Recipient/Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.recipient || tx.sender}</td>
                <td>{tx.category}</td>
                <td>{tx.date}</td>
                <td>{tx.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}