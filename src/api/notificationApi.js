// src/api/notificationApi.js
import apiClient from './index'; // Import the axios instance from apiClient.js

// Fetch notifications
export const fetchNotifications = async () => {
  try {
    const response = await apiClient.get('/notifications'); // Assuming endpoint is /notifications
    return response.data; // Assuming the response contains the notifications in the data field
  } catch (error) {
    console.error("Error fetching notifications", error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  try {
    const response = await apiClient.post(`/notifications/${notificationId}/read`);
    return response.data; // Assuming the API returns updated notification data
  } catch (error) {
    console.error("Error marking notification as read", error);
    throw error;
  }
};

// Example: Clear notifications (optional)
export const clearNotifications = async () => {
  try {
    await apiClient.delete('/notifications'); // Assuming an endpoint for clearing notifications
  } catch (error) {
    console.error("Error clearing notifications", error);
    throw error;
  }
};
