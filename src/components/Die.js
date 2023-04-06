import React from "react";

const Die = ({ value, held, toggleHeld }) => {
  const styles = {
    backgroundColor: held ? "#59E391" : "",
  };
  return (
    <button className="boton" onClick={toggleHeld}>
      <div className="numbers-cont" style={styles}>
        <h2 className="num">{value}</h2>
      </div>
    </button>
  );
};

export default Die;
