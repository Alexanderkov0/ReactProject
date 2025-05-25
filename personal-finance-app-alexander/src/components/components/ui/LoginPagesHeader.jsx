import React from "react";
import "./LoginPagesHeader.css";

export function LoginPagesHeader({ children }) {
    return <h1 className="login-pages-header text-center mb-4">{children}</h1>;
  }