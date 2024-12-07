import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Correct import for useSelector

const ProtectedRoute = ({ element }) => {
  // Access the authentication state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the passed element (e.g., Dashboard)
  return element;
};

export default ProtectedRoute;
