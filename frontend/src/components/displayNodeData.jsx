import React from "react";

const DisplayNodeData = ({ node, onClose }) => {
  if (!node) return null; // If no node is selected, don't render anything

  console.log("Displaying Node Info:", node); // Debugging log
  if(node.id === "first"){
    return (
      <div style={modalOverlayStyle}>
      <div style={modalStyle}>
      <h2>Node Information</h2>
      <p><strong>ID:</strong> {node.id || "Unknown"}</p>
      <p><strong>Label:</strong> {node.label || "No Label"}</p>
      <p><strong>Color:</strong> {node.color || "No Color"}</p>
      <p><strong>Items:</strong></p>
      <ul>
      {node.item && node.item.length > 0 ? (
        node.item.map((i, index) => (
        <li key={index}>{i.name}</li>
        ))
      ) : (
        <li>No Items</li>
      )}
      </ul>
      <p><strong>Termination Period:</strong> {node.terminationPeriod || "No Termination Period"}</p>
      <p><strong>Total Monthly Income:</strong> {node.total_monthly_income || "No Total Monthly Income"}</p>
      <button onClick={onClose} style={buttonStyle}>Close</button>
      </div>
      </div>
    );
  }
  else{
    return (
      <div style={modalOverlayStyle}>
        <div style={modalStyle}>
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
  }

};

export default DisplayNodeData;


// Styling
const modalOverlayStyle = {
  padding: "20px",
  minWidth: "21vw",
  maxWidth: "21vw",
  position: "fixed",
  top: 0,
  left: "75vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20,
};

const modalStyle = {
  background: "#1E1E2F",
  color: "white",
  padding: "20px",
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
