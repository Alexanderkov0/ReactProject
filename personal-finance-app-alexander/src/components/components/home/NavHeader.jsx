
import React from "react";
import "./NavHeader.css";

export default function NavHeader({ children }) {
  return (
    <div className="sidebar-header">
      {children}
    </div>
  );
}