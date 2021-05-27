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
        // color: "hsl(239, 75%, 40%)",
        color: 'hsl(265, 75%, 30%)',
        // boxShadow: 'inset 0px 0px 15px #a1a1a1'
        boxShadow: 'inset 0px 0px 15px #afafd0'
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
