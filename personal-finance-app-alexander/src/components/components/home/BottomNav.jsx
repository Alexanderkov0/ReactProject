import React from "react";
import "./BottomNav.css";


export default function BottomNav({ options, selected, onSelect }) {
  return (
    <nav className="bottom-nav d-md-none">
      {options.map((tab) => (
        <button
          key={tab.value}
          className={`bottom-nav-btn${selected === tab.value ? " active" : ""}`}
          onClick={() => onSelect(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}