import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../axiosInstance/instance';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const access = localStorage.getItem('access');
      if (!access) {
        console.log('fetchUserData: No access token found');
        return rejectWithValue('No access token found');
      }

      const response = await instance.get('/users/api/who', {
        headers: {
          'Authorization': `Bearer ${access}`,
        }
      });
      
      // Check for different possible response structures
      let userData = null;
      if (response.status === 200) {
        if (response.data?.response) {
          userData = response.data.response;
        } else if (response.data) {
          userData = response.data;
        }
        
        if (userData) {
          console.log('fetchUserData: User data retrieved', userData);
          return userData;
        }
      }
      
      console.log('fetchUserData: Failed to extract user data from response');
      return rejectWithValue('Failed to fetch user data');
    } catch (error) {
      console.error('fetchUserData: Error', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload; // Set to true only if payload exists
      state.error = null;
    },
    clearUserData: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = !!action.payload; // Set to true only if payload exists
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = action.payload;
        console.log('Redux state updated with error:', action.payload);
      });
  },
});

// Export actions and reducer
export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer; 