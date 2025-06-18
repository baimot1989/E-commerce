
// routes/CustomerRoute.js
import { Navigate, Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";

const CustomerRoute = () => {
  const user = useSelector((state) => state.auth.user); // get the logged-in user
  // Check if user is authenticated and has role "customer"
  if (user && user.role === "customer") {
    return <Outlet />; // render nested routes
  } else {
    return <Navigate to="/login" replace />; // redirect to login
  }
};

export default CustomerRoute;
