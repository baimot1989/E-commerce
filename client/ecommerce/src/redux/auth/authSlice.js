import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


import { loadCartForUser, saveCartForUser } from '../cart/cartUtils';
import { mergeCarts } from '../cart/mergeCarts';
import { setCartItems } from '../cart/cartSlice';

// Define the login endpoint for the backend
const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = `${API_URL}/authUser/login`;
const LOGOUT_URL = `${API_URL}/authUser/logout`;

// Create an async thunk for logging in the user
export const login = createAsyncThunk(
    'auth/login', // Action type string
    async (credentials, thunkAPI) => {
        try {
            const { data } = await axios.post(LOGIN_URL, credentials, { withCredentials: true });
            return data; // Return the user data (goes to fulfilled case)
            console.log(data)
        } catch (error) {
            // If there's an error, extract a message from the response
            const message = error.response?.data?.error || 'Login failed';
            // Reject the thunk with a custom error message
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create a slice for authentication
const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState: {
        // Initial state pulled from localStorage (persisted login)
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        error: null,
        loading: false,
    },
    reducers: {
        // Sync reducer for logging out
        logout: (state) => {
            // Clear user from Redux state and localStorage
            state.user = null;
            localStorage.removeItem('user');

            // Send logout request to clear cookie
            axios.post(LOGOUT_URL, {}, { withCredentials: true })
                .catch(err => {
                    console.error('Error during logout:', err);
                });
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        clearError: (state, action) => {
            state.error = action.payload
        },
        resetAuth: (state) => {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Handle pending, fulfilled, and rejected cases of the login thunk
        builder

            // When the login request is pending
            .addCase(login.pending, (state) => {
                state.loading = true;  // Set loading to true while waiting for response
                state.error = null;    // Clear previous errors
            })

            // When login is successful
            // .addCase(login.fulfilled, (state, action) => {
            //     state.loading = false;        // Stop loading
            //     state.user = action.payload;    // Store user data
            //     state.error = null;           // Clear errors

            //     // Persist user and token to localStorage
            //     localStorage.setItem('user', JSON.stringify(action.payload));
            // })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;

                localStorage.setItem('user', JSON.stringify(action.payload));

                // CART MERGE LOGIC 

                const userId = action.payload._id;

                const guestCart =
                    JSON.parse(localStorage.getItem("guest_cart")) || [];

                const userCart =
                    loadCartForUser(userId) || [];

                const merged = mergeCarts(guestCart, userCart);

                saveCartForUser(userId, merged);

                localStorage.removeItem("guest_cart");
            })

            // When login fails
            .addCase(login.rejected, (state, action) => {
                state.loading = false;  // Stop loading
                // Set the error message from the rejected action
                state.error = action.payload || action.error.message;
            });

    },
});

export const { logout, updateUser, clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
