// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = true;

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the passed element (e.g., Dashboard)
  return element;
};

export default ProtectedRoute;
