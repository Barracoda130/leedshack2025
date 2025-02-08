
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateDao from './createDao';
import DisplayGraph from './components/nodeMap'
import Sidebar from './components/sideBar'
import Dashboard from './dashboard';
//import Layout from './Layout'; // Adjust the path as necessary
const ThisRouter = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<CreateDao />} />
                    <Route path="/createDao" element={<CreateDao />} />
                    <Route path="/dashboard" element={<Dashboard />} />
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