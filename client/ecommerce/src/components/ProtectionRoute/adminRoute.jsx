// routes/AdminRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in, but not an admin
    return <Navigate to="/" replace />;
  }

  // Admin access granted
  return <Outlet />;
};

export default AdminRoute;
