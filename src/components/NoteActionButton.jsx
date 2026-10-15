import React from "react";

function NoteActionButton({ variant, onClick, children }) {
  return (
    <button
      className={`note-item__${variant}-button`}
      type="button"
      onClick={onClick}
      data-testid={`note-item-${variant}-button`}
    >
      {children}
    </button>
  );
}

export default NoteActionButton;
