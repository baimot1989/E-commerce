
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'All',
  price: 500, // default max value
  title: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setCategory, setPrice, setTitle, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;