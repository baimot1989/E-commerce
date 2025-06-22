import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useFetchData } from "./fetchData";
import { getDate } from "../utils/utils";
import {
  clearCart,
  clearCartError,
  closeCart,
  setOrderSuccess
} from "../redux/cart/cartSlice";
import {
  setModalMassgae,
  setOpenModal
} from "../redux/modal/modalSlice";

export const useSubmitOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateData, isloading } = useFetchData('http://localhost:3000/products');
  const { addData } = useFetchData('http://localhost:3000/orders');
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.auth.user);
  const subtotal = useSelector(state => state.cart.subtotal);

  const submitOrder = async () => {
    try {
      // Validate stock before proceeding
      const outOfStockItem = cartItems.find(item => item.inStock - item.quantity < 0);
      if (outOfStockItem) {
        dispatch(setModalMassgae(`Sorry, "${outOfStockItem.title}" is out of stock.`));
        dispatch(setOpenModal());
        return;
      }

      // Update products
      const updatePromises = cartItems.map(item => {
        const updatedProduct = {
          ...item,
          boughtBy: [...(item.boughtBy || []), {
            fullName: `${user.firstName} ${user.lastName}`,
            quantity: item.quantity,
            date: getDate(),
          }],
          inStock: item.inStock - item.quantity,
        };
        return updateData(item._id, updatedProduct);
      });

      await Promise.all(updatePromises);

      // Add order
      await addData({
        customerFullName: `${user.firstName} ${user.lastName}`,
        totalPrice: subtotal,
        productsList: cartItems.map(item => ({
          productName: item.title,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          date: getDate(),
        })),
      });

      // Finalize
      dispatch(closeCart());
      dispatch(clearCart());
      dispatch(setOrderSuccess());
      dispatch(setModalMassgae('Your order has been placed successfully!'));
      dispatch(setOpenModal());
      // navigate('/thank-you'); // optional

    } catch (err) {
      dispatch(setModalMassgae('Something went wrong...'));
      dispatch(setOpenModal());
      dispatch(clearCartError());
    }
  };

  return { submitOrder, isloading };
};
