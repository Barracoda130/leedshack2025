import React from "react";

const DisplayNodeData = ({ node, onClose }) => {
  if (!node) return null; // If no node is selected, don't render anything

  console.log("Displaying Node Info:", node); // Debugging log

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>Node Information</h2>
        <p><strong>ID:</strong> {node.id || "Unknown"}</p>
        <p><strong>Label:</strong> {node.label || "No Label"}</p>
        <p><strong>Color:</strong> {node.color || "No Color"}</p>
        {Object.entries(node).map(([key, value]) => (
          <p key={key}><strong>{key}:</strong> {JSON.stringify(value)}</p>
        ))}
        <button onClick={onClose} style={buttonStyle}>Close</button>
      </div>
    </div>

  );
};

export default DisplayNodeData;


// Styling
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20,
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  zIndex: 30,
};

const buttonStyle = {
  padding: "10px",
  background: "#4F91FA",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
