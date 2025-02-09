import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import axiosAuth from './api/axios-auth';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li>
                    <Link to="/createDao">Create</Link>
                </li>
                <li>
                    <Link to="/dashboard">dashboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;