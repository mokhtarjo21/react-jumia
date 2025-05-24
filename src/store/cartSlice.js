import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../axiosInstance/instance';
import { getCartFromCookies, clearCart as clearCookieCart } from '../utils/cartCookie';

// Async thunk to fetch cart from backend
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const access = localStorage.getItem('access');
      if (!access) {
        // If not logged in, get cart from cookies
        const cookieCart = getCartFromCookies();
        return cookieCart;
      }

      const response = await instance.get('/api/cart/', {
        headers: {
          'Authorization': `Bearer ${access}`,
        }
      });

      if (response.status === 200) {
        // Map the response to match our cart structure
        const items = response.data || [];
        const formattedItems = Array.isArray(items) ? items.map(item => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.sale_price || item.product.price,
            image: item.product.product_images?.[0]?.image || null,
          },
          quantity: item.quantity,
          color: item.colors,
          size: item.size
        })) : [];
        
        return formattedItems;
      } else {
        return rejectWithValue('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If there's an error, try to get cart from cookies
      const cookieCart = getCartFromCookies();
      return cookieCart;
    }
  }
);

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => 
        item.product.id === newItem.product.id && 
        item.color === newItem.color && 
        item.size === newItem.size
      );
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    
    // Update item quantity
    updateQuantity: (state, action) => {
      const { productId, color, size, quantity } = action.payload;
      const item = state.items.find(item => 
        item.product.id === productId && 
        item.color === color && 
        item.size === size
      );
      
      if (item) {
        item.quantity = quantity;
      }
    },
    
    // Remove item from cart
    removeFromCart: (state, action) => {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.product.id === productId && 
          item.color === color && 
          item.size === size)
      );
    },
    
    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      // Also clear cookie cart
      clearCookieCart();
    },
    
    // Set the entire cart (used when loading from cookies or syncing)
    setCartItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartLoading = state => state.cart.loading;
export const selectCartError = state => state.cart.error;

// Calculate total items in cart
export const selectCartItemCount = state => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Calculate total price
export const selectCartTotal = state => {
  return state.cart.items.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );
};

// Export actions and reducer
export const { 
  addToCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart, 
  setCartItems 
} = cartSlice.actions;

export default cartSlice.reducer; 