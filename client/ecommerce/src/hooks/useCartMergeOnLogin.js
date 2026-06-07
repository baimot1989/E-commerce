import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCartForUser, saveCartForUser } from "../redux/cart/cartUtils";
import { mergeCarts } from "../redux/cart/mergeCarts";
import { setCartItems } from "../redux/cart/cartSlice";

export const useCartMergeOnLogin = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.user?._id) return;

    const userId = user.user._id;

    const guestCart =
      JSON.parse(localStorage.getItem("guest_cart")) || [];

    const userCart =
      loadCartForUser(userId) || [];

    const merged = mergeCarts(guestCart, userCart);

    saveCartForUser(userId, merged);

    localStorage.removeItem("guest_cart");

    dispatch(setCartItems(merged));
  }, [user, dispatch]);
};