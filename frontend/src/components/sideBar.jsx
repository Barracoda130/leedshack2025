import React from "react";
import Navbar from "../Navbar";

const Sidebar = () => {
    return (
        <div style={sidebarStyle}>
            <div style={userStyle}>
                <h2>User Info</h2>
                <p><strong>Username:</strong> PlaceholderUser</p>
                <Navbar />
            </div>
            <div style={sidebarItemStyle}>
                <h3>Item 1</h3>
                <p>Item 1 Description</p>
            </div>
            <div style={gitgraphStyle}>
                <h3>GitGraph</h3>
                <p>GitGraph Description</p>
            </div>
        </div>
    );
};

// Sidebar Styles
const sidebarStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "250px",
    height: "100vh",
    background: "#1E1E2F",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)"
};

const userStyle = {
    borderBottom: "1px solid white",

};
const sidebarItemStyle = {
    borderBottom: "1px solid white",
    minHeight: "40vh",
};
const gitgraphStyle = {
    borderBottom: "1px solid white",
};

export default Sidebar;
