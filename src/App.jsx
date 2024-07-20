import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminTools from './pages/AdminTools';

import Login from './pages/Login';  // Import the Login page

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* New route for Login */}
        <Route path="/admintools" element={<ProtectedAdminTools />} /> {/* Protected AdminTools route */}
      </Routes>
    </BrowserRouter>
  );
};

// Protected route component for AdminTools
const ProtectedAdminTools = () => {
  const token = localStorage.getItem('authToken');

  return token ? <AdminTools /> : <Navigate to="/login" />;
};

export default App;
