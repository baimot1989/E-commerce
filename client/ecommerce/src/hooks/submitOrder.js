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

const API_URL = import.meta.env.VITE_API_URL;

export const useSubmitOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateData, isloading } = useFetchData(`${API_URL}/products`);
  const { updateByPatch } = useFetchData(`${API_URL}/users`);
  const { addData } = useFetchData(`${API_URL}/orders`);
  const cartItems = useSelector(state => state.cart.cartItems);
  const shippingAddress = useSelector(state => state.cart.shippingAddress);
  const user = useSelector(state => state.auth.user);
  const subtotal = useSelector(state => state.cart.subtotal);

  const submitOrder = async () => {

    try {
      // Update products
      const updatePromises = cartItems.map(item => {
        const updatedProduct = {
          ...item,
          boughtBy: [...(item.boughtBy || []), {
            fullName: `${user.firstName} ${user.lastName}`,
            quantity: item.quantity,
            bought: item.bought + item.quantity,
            date: getDate(),
          }],
          inStock: item.inStock - item.quantity,
        };
        if (user.allowOthersToSeeOrders) {
          updatedProduct.bought = item.bought + item.quantity;
        }
        console.log(updatedProduct)
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
         
      // Update user Shipping Address
      await updateByPatch(user._id, shippingAddress)

      // Finalize
      dispatch(clearCart());
     
    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);
      dispatch(setModalMassgae('Something went wrong...'));
      dispatch(setOpenModal());
      dispatch(clearCartError());
    }
  };

  return { submitOrder, isloading };
};
