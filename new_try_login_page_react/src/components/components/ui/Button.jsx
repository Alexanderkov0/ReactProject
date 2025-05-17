import React from "react";

//button component
export function Button({ onClick, children, className = ""  }) {
    return <button onClick={onClick} className={`${className}`}>{children}</button>;
  }

