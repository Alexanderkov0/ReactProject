import React from "react";

export function WhiteCard({ className = "", children, ...props }) {
  return (
    <div className={`shadow-sm bg-white rounded m-2 p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}