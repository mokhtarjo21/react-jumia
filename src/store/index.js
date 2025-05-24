// /src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer,
    cart: cartReducer,
    // add other slices here
  },
});

export default store;
