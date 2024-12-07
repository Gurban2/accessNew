import React, { createContext, useContext, useEffect, useState } from "react";

// Create an AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the application and manage auth state
export const AuthProvider = ({ children }) => {
  // Check if the token exists in localStorage for initial auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null, // Check if there is a valid token
  );

  useEffect(() => {
    // Update localStorage when isAuthenticated state changes
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated"); // Optionally remove the flag when logging out
      localStorage.removeItem("token"); // Remove token from localStorage when logging out
    }
  }, [isAuthenticated]);

  // This is the login function that updates isAuthenticated to true
  const login = (token) => {
    // Save the token to localStorage and update isAuthenticated state
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // This is the logout function that updates isAuthenticated to false
  const logout = () => {
    // Remove token and set isAuthenticated to false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => useContext(AuthContext);
