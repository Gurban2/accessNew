import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import Main from "./Main"; // Import the Main component
import Login from "./components/Pages/Login/Login";
import { AuthProvider, useAuth } from "./contexts/auth/AuthContext";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer position="top-right" />
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* Protected Route for Main */}
              <Route path="*" element={<PrivateRoute element={<Main />} />} />
            </Routes>
          </Router>
        </Provider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth(); // Assuming isAuthenticated is a boolean indicating the user's authentication status

  // Log the authentication status to verify
  console.log("Authenticated:", isAuthenticated);

  // If not authenticated, redirect to login page, otherwise show the protected route element
  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default App;
