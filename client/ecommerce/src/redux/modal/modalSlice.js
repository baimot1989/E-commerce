// redux/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openModal: false,
  massgae: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // REDUCERS FOR CART STATE
    setOpenModal: (state) => {
        state.openModal = true;
    },
    setCloseModal: (state) => {
        state.openModal = false;
    },
    setModalMassgae: (state, action) => {
        state.massgae = action.payload;
    }
  }
})

export const {
 setOpenModal,
 setCloseModal,
 setModalMassgae,
} = modalSlice.actions;

export default modalSlice.reducer;