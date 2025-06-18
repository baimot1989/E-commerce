import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../redux/auth/authSlice';
import cartReducer from '../redux/cart/cartSlice'; 
import modalReducer from '../redux/modal/modalSlice'

// Combine all reducers into a single root reducer (you can add more reducers here)
const rootReducer = combineReducers({
  auth: authReducer, 
  cart: cartReducer,
  modal: modalReducer
});

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',                    // The key under which the state will be stored in localStorage
  version: 1,                     // Version number for potential migrations in the future
  storage,                        // Storage engine (in this case, localStorage)
  whitelist: ['auth'],    // persist only auth
};

// Enhance the root reducer with persistence capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted version of the reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings about non-serializable values in the state
    }),
});

// Create the persistor which is used to persist and rehydrate the store
export const persistor = persistStore(store);
