import React from "react";

const Button = ({ roll, tenzie }) => {
  return (
    <div>
      <button className="roll-button" onClick={roll}>
        {!tenzie ? "ROLL" : "TRY AGAIN"}
      </button>
    </div>
  );
};

export default Button;
