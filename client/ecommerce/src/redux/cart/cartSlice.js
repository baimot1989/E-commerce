
// redux/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  cartOpen: false,
  totalItemTypes: 0,
  subtotal: 0,
  error: null,
  success: false,
  orderSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // REDUCERS FOR CART STATE
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalItemTypes = state.cartItems.length;
      console.log(action.payload)
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity < item.inStock) {
        item.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    // הוספת מוצר לעגלה
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);
    // אם המוצר קיים בעגלה, לא להוסיף
      if (existingItem) {
        state.error = 'המוצר כבר נוסף לעגלה';
        state.success = false;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
        state.totalItemTypes = state.cartItems.length;
        state.error = null;
        state.success = true; 
      }
    },
    // להסיר מוצר מעגלה
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== idToRemove);
      state.totalItemTypes = state.cartItems.length;
    },
    // REDUCER FOR TOTAL PRICE
    calcSubtotal: (state) => {
        state.subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    // REDUCER FOR UPDATING  QUANTITY OF ITEMS
    totalItem: (state) => {
      console.log(state.cartItems.length)
        state.totalItemTypes = state.cartItems.length;
      },
      setOrderSuccess: (state) => {
           state.orderSuccess = !state.orderSuccess;
      },
        // REDUCER FOR CLEAR  ERROR STATA 
      clearCartError: (state) => {
        state.error = null;
      },
      clearCartSuccess: (state) => {
        state.success = false;
      },

    // REDUCERS FOR CONTROLLING CART DRAWER
    openCart: (state) => {
      state.cartOpen = true;
      console.log(state.cartOpen)
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    }
  }
})

export const {
  increaseQty,
  decreaseQty,
  clearCart,
  setCartItems,
  addItem,
  removeFromCart,
  openCart,
  closeCart,
  toggleCart,
  totalItem,
  clearCartError,
  clearCartSuccess,
  calcSubtotal,
  setOrderSuccess,
  
} = cartSlice.actions;

export default cartSlice.reducer;
