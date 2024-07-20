import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Admin from '../pages/Admin';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = true; // Replace with your actual authentication logic
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={element} />
    </Routes>
  );
};

export default PrivateRoute;
