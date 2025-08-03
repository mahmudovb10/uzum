import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children, user }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
