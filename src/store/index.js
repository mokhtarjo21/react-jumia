// /src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    // add other slices here
  },
});

export default store;
