// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import TeamleadDashboard from './components/TeamLeadDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/teamlead" element={<TeamleadDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;


