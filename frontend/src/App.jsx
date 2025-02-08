import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateDao from './createDao';
//import Layout from './Layout'; // Adjust the path as necessary
const ThisRouter = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<CreateDao />} />
                    <Route path="/createDao" element={<CreateDao />} />
                </Routes>
        </Router>
    );
}

const App = () => {
    return (
        <div>
            <ThisRouter />
        </div>
    );
}


export default App;