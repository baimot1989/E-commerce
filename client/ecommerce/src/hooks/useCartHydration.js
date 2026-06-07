import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../redux/cart/cartSlice";

export const useCartHydration = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // בודק אם יש משתמש קיים
    if (user) return; //  אל תטען guest אם משתמש מחובר
    
    //  localStorage טוען את העגלת אורח מ 
    const raw = localStorage.getItem("guest_cart");
    const guestCart = raw ? JSON.parse(raw) : [];
    
    // redx מעדכן את העגלת קניות ב
    dispatch(setCartItems(guestCart));

    // if (guestCart.length > 0) {
    //   dispatch(setCartItems(guestCart));
    // }
  }, [dispatch, user]);
};