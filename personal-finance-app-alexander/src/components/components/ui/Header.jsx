import React from "react";
import "../layout/Page.css";

export function Header({ children }) {
    return <h1 className="header header-left mb-4">{children}</h1>;
  }

