import { Navigate } from "react-router-dom";

export default function AuthGuard({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
