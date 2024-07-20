import React from 'react';
import Admin from './Admin';
import AdminGiveaway from './AdminGiveaway';
import { useNavigate } from 'react-router-dom';
import './AdminTools.css'

const AdminTools = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Clear the token
        navigate('/login');  // Redirect to the login page
    };

    return (
        <div id="admin-tools-page">
            <button id="logout-button" onClick={handleLogout}>Logout</button>
            <div id="admin-section">
                <Admin />
            </div>
            <div id="admin-giveaway-section">
                <AdminGiveaway />
            </div>
        </div>
    );
};

export default AdminTools;
