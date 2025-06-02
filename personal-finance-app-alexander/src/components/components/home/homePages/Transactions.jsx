import React, { useState, useEffect } from "react";
import { PageHeader } from "./homePagesUi/PageHeader";
import { TransactionsTable } from "./homePagesUi/TransactionsTable";
import { parseAmount } from "./homePagesUi/parseAmount";
import { Button } from "../../ui/Button";
import Modal from "../../ui/Modal"; // adjust path as needed
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";

import "./ModalPortal";
import ModalPortal from "./ModalPortal";

const API_URL = "http://localhost:5000/api/transactions"; // <-- Backend endpoint

const ITEMS_PER_PAGE = 10;

export default function Transactions() {
  const { user, token } = useAuth();
  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(1); // <-- Add page state

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    recipient: "",
    category: "",
    date: "",
    amount: "",
  });

  // Categories for filter and form
  const defaultCategories = [
    "Groceries",
    "Rent",
    "Utilities",
    "Entertainment",
    "Transport",
    "Other",
  ];

  const categories = [
    "All",
    ...Array.from(
      new Set([...defaultCategories, ...transactions.map((tx) => tx.category)])
    ),
  ];
  const sortOptions = [
    { label: "Date (Newest)", value: "date-desc" },
    { label: "Date (Oldest)", value: "date-asc" },
    { label: "Amount (High to Low)", value: "amount-desc" },
    { label: "Amount (Low to High)", value: "amount-asc" },
  ];

  // Fetch transactions from backend on mount
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        if (!user || !token) {
          setTransactions([]);
          setLoading(false);
          return;
        }
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        setTransactions([]);
      }
      setLoading(false);
    }
    fetchTransactions();
  }, [user, token]);

  // Filter and sort logic
  let filtered = transactions.filter(
    (tx) =>
      (category === "All" || tx.category === category) &&
      (tx.recipient.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortBy === "date-desc")
    filtered = filtered.sort((a, b) => b.date.localeCompare(a.date));
  if (sortBy === "date-asc")
    filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
  if (sortBy === "amount-desc")
    filtered = filtered.sort(
      (a, b) => parseAmount(b.amount) - parseAmount(a.amount)
    );
  if (sortBy === "amount-asc")
    filtered = filtered.sort(
      (a, b) => parseAmount(a.amount) - parseAmount(b.amount)
    );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset to page 1 if filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, sortBy]);

  // Modal handlers
  function handleShowModal() {
    setForm({ recipient: "", category: "", date: "", amount: "" });
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Submit handler: POST to backend and update state
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Parse and store as a number
    let raw = form.amount.trim();
    let value = parseFloat(raw.replace(/[^0-9.-]+/g, ""));
    if (isNaN(value)) value = 0;
    if (raw.startsWith("-")) value = -Math.abs(value);
    else value = Math.abs(value);

    // Prepare data for backend
    const payload = {
      ...form,
      amount: value,
      // Do NOT send user, backend gets it from token
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const newTx = await res.json();
        setTransactions((prev) => [newTx, ...prev]);
        setShowModal(false);
      } else {
        alert("Failed to add transaction");
      }
    } catch {
      alert("Failed to add transaction");
    }
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <PageHeader>Transactions</PageHeader>
            <Button className="btn btn-dark mb-3 " onClick={handleShowModal}>
              add transaction
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="bg-white p-4 rounded shadow-sm">
            {/* Search and filter controls */}
            <div className="row mb-3">
              <div className="col-md-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by recipient or category"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Table data */}
            {loading ? (
              <div className="text-center my-4">Loading...</div>
            ) : (
              <TransactionsTable data={paginatedData} />
            )}
            {/* Pagination controls */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="align-self-center">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal show={showModal} onClose={handleCloseModal} title="Add Transaction">
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Recipient</label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient"
                  value={form.recipient}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  value={form.amount}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}