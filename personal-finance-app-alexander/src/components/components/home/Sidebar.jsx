import React from "react";
import "./Sidebar.css";

export default function Sidebar({ className = "", minimized, children }) {
  return (
    <div className={`d-none d-md-block p-0 border-end Sidebar ${minimized ? "col-md-1" : "col-md-3"} ${className}`}>
      {children}
    </div>
  );
}