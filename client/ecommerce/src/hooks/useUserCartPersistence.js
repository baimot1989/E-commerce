import { useEffect } from "react";
import { useSelector } from "react-redux";
import { saveCartForUser } from "../redux/cart/cartUtils";

export const useUserCartPersistence = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user?.user?._id) return;

    saveCartForUser(user.user._id, cartItems);
  }, [cartItems, user]);
};