import React from "react";
import displayAmount from "../../../utils/displayAmount";
import formatDate from "../../../utils/formatDate"; // <-- import

export function TransactionsTable({ data, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Recipient/Sender</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((tx, idx) => (
              <tr key={tx._id || idx}>
                <td>{tx.recipient || tx.sender}</td>
                <td>{tx.category}</td>
                <td>{formatDate(tx.date)}</td> {/* <-- formatted */}
                <td>{displayAmount(Number(tx.amount))}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(tx._id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}