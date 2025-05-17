import React from "react";
import './Container.css';

export function Container({ children }) {
    return <div className="container shadow rounded p-0 overflow-hidden">{children}</div>;
}

