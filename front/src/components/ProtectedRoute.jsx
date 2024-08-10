import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { token, user, loading } = useAuthStore();

  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar este mensaje o agregar un spinner
  }

  if (!token) {
    return <Navigate to="/Login" />;
  }

  if (requiredRole && (!user || user.rol !== requiredRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
