import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');

    // Hvis token ikke finnes, naviger til login-siden
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Ellers, rendér de beskyttede komponentene
    return children;
};

export default ProtectedRoute;