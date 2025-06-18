import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadCartForUser, saveCartForUser } from "../redux/cart/cartUtils";
import { setCartItems, totalItem } from "../redux/cart/cartSlice";


const CustomerDashboard = () => {

    // const user = useSelector((state) => state.auth.user);
    // const cartItems = useSelector(state => state.cart.cartItems)
    // const dispatch = useDispatch();
    // console.log(cartItems)
   
    // useEffect(() => {

    //     if (user?._id) {
    //       const loadedCart = loadCartForUser(user._id);
    //       console.log(loadedCart)
    //       if (loadedCart) {
    //         dispatch(setCartItems(loadedCart));
    //       }
    //     }
    //   }, [user?._id, cartItems]);

    //   useEffect(() => {
    //     if (user?._id) {
    //       saveCartForUser(user._id, cartItems);
    //       dispatch(totalItem());
    //     }
    //   }, [cartItems, user?.id])



    return ( 
        <>
        </>
     );
}
 
export default CustomerDashboard;