import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for syncing favorites with backend
export const syncFavoritesWithBackend = createAsyncThunk(
  'favorites/syncWithBackend',
  async (_, { getState }) => {
    const { favorites } = getState();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/favorites/sync', {
        favorites: favorites.items
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing favorites:', error);
      throw error;
    }
  }
);

const initialState = {
  items: [], 
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavoritesFromStorage(state, action) {
      state.items = action.payload;
    },
    addFavorite(state, action) {
      const product = action.payload;
      if (!state.items.some(item => item.id === product.id)) {
        state.items.push(product);
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite(state, action) {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    clearFavorites(state) {
      state.items = [];
      localStorage.removeItem('favorites');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncFavoritesWithBackend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncFavoritesWithBackend.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(syncFavoritesWithBackend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  addFavorite,
  removeFavorite,
  loadFavoritesFromStorage,
  clearFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
