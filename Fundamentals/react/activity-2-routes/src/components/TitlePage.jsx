import React from "react";

export default function TitlePage({title, children}) {
  return (
    <div className="div d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-dark">
      <h5>{title}</h5>
      {children}
    </div>
  );
}
