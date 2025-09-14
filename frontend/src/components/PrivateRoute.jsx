import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
  if (!user && !tokens?.access) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
