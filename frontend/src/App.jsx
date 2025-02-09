
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateDao from './createDao';
import LoginPage from './login';
import RegisterPage from './register';
import DisplayGraph from './components/nodeMap'
import Sidebar from './components/sideBar'
import Dashboard from './dashboard';
import Navbar from './Navbar';
//import Layout from './Layout'; // Adjust the path as necessary
const ThisRouter = () => {
    return (
        <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<CreateDao />} />
                    <Route path="/createDao" element={<CreateDao />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<LoginPage />} /> 
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
        </Router>
    );
}

  /*  <>
        <DisplayGraph />
        <Sidebar />
        
    </>*/

const App = () => {
    return (
        <div>
            <ThisRouter />
        </div>
    );
}


export default App;