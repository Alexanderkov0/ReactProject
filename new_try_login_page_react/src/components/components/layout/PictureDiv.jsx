import React from "react";

export function PictureDiv({ children }) {
    return <div className={`col-md-6 d-none d-md-flex align-items-center justify-content-center `}>{children}</div>;
  }