import { useDispatch, useSelector } from 'react-redux';
import {
    setModalMassgae,
    setOpenModal
} from "../redux/modal/modalSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItem, closeCart } from '../redux/cart/cartSlice';

export const useOutOfStock = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemsInstock, setItemsInstock] = useState(false)


    // Validate stock before proceeding
    const outOfStockCheck = () => {

        const outOfStockItems = cartItems.filter(
            item => item.quantity > item.inStock
        );
        console.log(outOfStockItems, cartItems)
        if (!cartItems.length > 0) {
            dispatch(
                setModalMassgae(`Your cart is empty. Please add items before continuing.`)
            );
            dispatch(setOpenModal());
            return;
        }
        else if (outOfStockItems.length > 0) {
            dispatch(
                setModalMassgae(`Some items are out of stock: ${outOfStockItems.map(i => i.title).join(", ")}`)
            );
            dispatch(setOpenModal());
            console.log(outOfStockItems)
            return;
        } else {
            setItemsInstock(true)
            dispatch(closeCart())
            navigate('/customerdash/preorder')
        }
    }
    // Validate stock before Adding to cart

    const beforeAddinToCart = (product) => {
        if (product.inStock) {
            dispatch(addItem(product));
        } else {
            dispatch(
                setModalMassgae(`This product is currently unavailable. Please check back later`)
            );
            dispatch(setOpenModal());

        }
    }

    return { outOfStockCheck, beforeAddinToCart, itemsInstock }
}