import React from "react";
import "./Tabs.css"; 

export default function Tabs({ options, selected, onSelect }) {
  return (
    <ul className="nav flex-column nav-pills my-custom-nav">
      {options.map((tab) => {
        const isActive = selected === tab.value;
        return (
          <li className="nav-item" key={tab.value}>
            <button
              className={`nav-link d-flex align-items-center ${isActive ? "active" : ""} my-custom-tab`}
              onClick={() => onSelect(tab.value)}
              type="button"
            >
              {tab.icon && (
                <span className="nav-icon me-2" style={{ width: 28, display: "inline-block" }}>
                  <img
                    src={tab.icon}
                    alt={`${tab.label} nav-icon`}
                    style={{
                      width: 24,
                      height: 24,
                      filter: isActive
                        ? "brightness(0) invert(0)" // Black icon when active
                        : "brightness(0) invert(1)", // White icon when inactive
                      transition: "filter 0.2s"
                    }}
                  />
                </span>
              )}
              <span>{tab.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}