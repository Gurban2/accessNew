// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // This will hold user data after login
    isAuthenticated: false, // This will be true after successful login
    error: null, // This will hold any error message if login fails
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload; // Store the user data
      state.isAuthenticated = true; // Set the user as authenticated
      state.error = null; // Clear any previous errors
    },
    loginFailure(state, action) {
      state.error = action.payload; // Set the error message from the payload
      state.isAuthenticated = false; // Set the user as not authenticated
    },
    logout(state) {
      state.user = null; // Clear user data
      state.isAuthenticated = false; // Set authenticated flag to false
      state.error = null; // Clear any error messages
    },
    setError(state, action) {
      state.error = action.payload; // Set error message manually
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
