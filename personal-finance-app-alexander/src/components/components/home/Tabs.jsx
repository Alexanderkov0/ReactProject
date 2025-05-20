import React from "react";
import "./Tabs.css"; 

export default function Tabs({ options, selected, onSelect }) {
  return (
    <ul className="nav flex-column nav-pills my-custom-nav">
      {options.map((tab) => (
        <li className="nav-item" key={tab.value}>
          <button
            className={`nav-link ${selected === tab.value ? "active" : ""} my-custom-tab`}
            onClick={() => onSelect(tab.value)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
}