import React from "react";

//input component
export function Input({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="input-field form-control mb-3"
    />
  );
}

