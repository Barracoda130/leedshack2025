import React, { useState } from "react";

const AddNodeModal = ({ isOpen, onClose, onSubmit }) => {
  const [nodeName, setNodeName] = useState("");
    const [surname, setSurname] = useState("");
  const [items, setItems] = useState([""]); // Store items in an array

  if (!isOpen) return null; // Don't render if modal is closed

  // Function to update an item's value
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  // Function to add a new empty item input
  const addItemField = () => {
    setItems([...items, ""]);
  };

  // Function to remove an item field
  const removeItemField = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: nodeName, surname: surname,items });
    setNodeName(""); // Reset form
    setSurname(""); // Reset form
    setItems([""]); // Reset items
    onClose();
  };

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2>Add Node</h2>
        <form onSubmit={handleSubmit}>
         
            <h3>Name:</h3>
            <input type="text" value={nodeName} onChange={(e) => setNodeName(e.target.value)} required />
            <h3>Surname:</h3>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />

          {/* Item List */}
          <div>
            <h3>Items</h3>
            {items.map((item, index) => (
              <div key={index} style={itemContainer}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  required
                />
                <button type="button" onClick={() => removeItemField(index)} style={removeButton}>
                  delete
                </button>
              </div>
            ))}
            <button type="button" onClick={addItemField} style={addButton}>
                Add Item
            </button>
          </div>

          <button type="submit" style={submitButton}>Add Node</button>
          <button type="button" onClick={onClose} style={cancelButton}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

// Modal Styles
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20
};

const modalStyle = {
  background: "#1E1E2F",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  zIndex: 30
};

const itemContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px"
};

const addButton = {
  marginTop: "10px",
  marginBottom: "10px",
  background: "#4F91FA",
  color: "white",
  border: "none",
  padding: "8px",
  borderRadius: "5px",
  cursor: "pointer"
};

const removeButton = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px",
  borderRadius: "5px",
  cursor: "pointer"
};

const submitButton = {
  background: "green",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px"
};

const cancelButton = {
  background: "gray",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default AddNodeModal;
