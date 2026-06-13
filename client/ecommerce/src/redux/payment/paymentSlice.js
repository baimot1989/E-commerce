// redux/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paymentCompleted: false
};

const modalSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        // REDUCERS FOR CART STATE
        setPaymentCompleted: (state) => {
            state.paymentCompleted = true;
        },
    }
})

export const {
   setPaymentCompleted,
} = paymentSlice.actions;

export default modalSlice.reducer;