
// routes/CustomerRoute.js
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { totalItem } from "../../redux/cart/cartSlice";
import { useEffect } from "react";
import { useOutOfStock } from "../../hooks/outOfStockCheckHook";

const CheckoutProcess = () => {
  const cartItems = useSelector(state => state.cart.cartItems);

  if (cartItems.length === 0) {
    return <Navigate to="/customerdash" replace />;
  }

  return <Outlet />;
};

export default CheckoutProcess;

