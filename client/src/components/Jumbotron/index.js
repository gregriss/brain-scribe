import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 175,
        clear: "both",
        paddingTop: 60,
        marginTop: '1rem',
        textAlign: "center",
        background: '#eeeef7',
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
