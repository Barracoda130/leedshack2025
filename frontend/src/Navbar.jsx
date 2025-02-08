import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/createDao">Create</Link>
                </li>
                <li>
                    <Link to="/example">Example</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;