import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} onClick={onClose}></div>
      {/* Modal */}
      <div className="modal fade show" style={{ display: "block", zIndex: 1055 }} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
            )}
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}