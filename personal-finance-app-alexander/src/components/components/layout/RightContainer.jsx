import React from "react";
import "./RightContainer.css";

export function RightContainer({ children }) {
  return (
    <div className="col-md-6 d-flex flex-column justify-content-center p-4 right_container_padding">
      {children}
    </div>
  );
}