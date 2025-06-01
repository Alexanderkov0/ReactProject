import React, {useState} from "react";
import {PageHeader} from "./homePagesUi/PageHeader";
import {TransactionsTable} from "./homePagesUi/TransactionsTable";
import { parseAmount } from "./homePagesUi/parseAmount";
import {Button} from "../../ui/Button";


const sampleData = [
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
    { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
    { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
  { recipient: "alex",category: "Groceries", date: "2024-06-01", amount: "-$50.00" },
  { recipient: "alex",category: "Rent", date: "2024-06-01", amount: "+$1200.00" },
  { recipient: "nisim",category: "Utilities", date: "2024-06-02", amount: "-$100.00" },
];


const categories = ["All", ...Array.from(new Set(sampleData.map(tx => tx.category)))];
const sortOptions = [
  { label: "Date (Newest)", value: "date-desc" },
  { label: "Date (Oldest)", value: "date-asc" },
  { label: "Amount (High to Low)", value: "amount-desc" },
  { label: "Amount (Low to High)", value: "amount-asc" },
];


const ITEMS_PER_PAGE = 10;


export default function Transactions() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [page, setPage] = useState(1); // <-- Add page state

  // Filter and sort logic
  let filtered = sampleData.filter(tx =>
    (category === "All" || tx.category === category) &&
    (tx.recipient.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortBy === "date-desc") filtered = filtered.sort((a, b) => b.date.localeCompare(a.date));
  if (sortBy === "date-asc") filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
  if (sortBy === "amount-desc") filtered = filtered.sort((a, b) => parseAmount(b.amount) - parseAmount(a.amount));
  if (sortBy === "amount-asc") filtered = filtered.sort((a, b) => parseAmount(a.amount) - parseAmount(b.amount));


 // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    // Reset to page 1 if filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, category, sortBy]);


  return (
  <>
    <div className="row mb-3">
      <div className="col">
        <div className="d-flex justify-content-between align-items-center">
          <PageHeader>Transactions</PageHeader>
          <Button className="btn btn-dark mb-3">
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
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Table data */}
                        <TransactionsTable data={paginatedData} />
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
    </>
  );
}