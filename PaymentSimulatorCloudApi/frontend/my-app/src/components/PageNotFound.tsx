import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 Not Found</h1>
      <p>Looks like you've stumbled upon a page that doesn't exist.</p>
      <img
        src=""
        alt="404 Not Found"
        style={{ display: "block", margin: "auto", maxWidth: "100%" }}
      />
    </div>
  );
};

export default PageNotFound;
