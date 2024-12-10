// src/redux/slices/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Action to add a new notification
    addNotification: (state, action) => {
      state.data.push(action.payload);
    },

    // Action to delete a notification
    deleteNotification: (state, action) => {
      state.data = state.data.filter(
        (notification) => notification.id !== action.payload.id,
      );
    },

    // Action to mark a notification as read
    markAsRead: (state, action) => {
      const index = state.data.findIndex(
        (notification) => notification.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index].read = true;
      }
    },

    // Action to set the list of notifications (e.g., from API)
    setNotifications: (state, action) => {
      state.data = action.payload;
    },

    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Action to set error message
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNotification,
  deleteNotification,
  markAsRead,
  setNotifications,
  setLoading,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
