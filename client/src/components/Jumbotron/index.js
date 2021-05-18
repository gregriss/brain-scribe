import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 250, clear: "both", paddingTop: 100, textAlign: "center", color: "hsl(239, 75%, 40%)" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
