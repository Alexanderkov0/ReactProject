import React from "react";

//input component
export function Input({ type, placeholder}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-field form-control mb-3"
    />
  );
}

