import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Correct import for useSelector
import { AppPaths } from "../constants/appPaths";

const ProtectedRoute = ({ element, permissionGroup }) => {
  const { user } = useSelector((state) => state.auth);

  if (
    permissionGroup?.includes(user.role.toLowerCase()) ||
    user.role.toLowerCase() === "admin"
  ) {
    return element;
  }
  return <Navigate to={AppPaths.dashboard} />;
};

export default ProtectedRoute;
