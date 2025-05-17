import React from "react";

//footer component
export function Footer({ url, children, linktext }) {
  return (
    <footer className="footer text-center mt-3">
      {children}
      <a href={url} className="footer-link ms-2 text-primary text-decoration-none">{`${linktext}`}</a>
    </footer>
  );
}

