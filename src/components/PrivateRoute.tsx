// src/components/PrivateRoute.tsx
import { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Protegemos rutas que empiezan con /admin
  if (location.pathname.startsWith("/admin") && !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
