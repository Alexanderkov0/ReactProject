import React from "react";
import "./Sidebar.css";

export default function Sidebar({ className = "", children }) {
  return (
    <div className={`col-md-3 p-0 border-end Sidebar ${className}`}>
      {children}
    </div>
  );
}