import React from "react";
import "./Page.css";

export function Page({ children, className = ""   }) {
    return <div className={`page-container ${className}`}>{children}</div>;
  }

