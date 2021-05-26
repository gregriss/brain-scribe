import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 250,
        clear: "both",
        paddingTop: 100,
        marginTop: '1rem',
        textAlign: "center",
        color: "hsl(239, 75%, 40%)",
        boxShadow: 'inset 0px 0px 15px #a1a1a1'
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
