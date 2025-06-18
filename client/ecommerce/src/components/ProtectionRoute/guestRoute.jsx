
// routes/GuestRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Outlet />; // allow access to /login or /signup
  }

  // Redirect based on role
  if (user.role === "admin") return <Navigate to="/admindash" />;
  if (user.role === "customer") return <Navigate to="/customerdash" />;
  return <Navigate to="/" />;
};

export default GuestRoute;
