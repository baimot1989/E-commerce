import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useGuestCartPersistence = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {

    // בודק אם קיים משתמש בערכת
    if (user) return; //  לא לשמור guest אם מחובר

// localStorage שמירת העגלת קניות של אורח ב 
    localStorage.setItem("guest_cart", JSON.stringify(cartItems));
  }, [cartItems, user]);
};