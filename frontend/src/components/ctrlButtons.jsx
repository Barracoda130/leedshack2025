import React from "react";

const GraphControls = ({ addNode, deleteNode }) => {
  return (
    <div style={controlsStyle}>
      <button onClick={addNode} style={buttonStyle}>Add Node</button>
      <button onClick={deleteNode} style={buttonStyle}>Delete Node</button>
    </div>
  );
};

// Styles for the buttons container
const controlsStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  display: "flex",
  gap: "10px",
  zIndex: 10,
};

// Button styling
const buttonStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  background: "#4F91FA",
  color: "white",
  fontWeight: "bold",
};

export default GraphControls;