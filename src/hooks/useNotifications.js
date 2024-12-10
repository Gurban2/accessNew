import { useState, useEffect } from 'react';
import { fetchNotifications } from '../api/notificationApi'; // Import the fetch function from your API

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch notifications when the hook is first used
  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const data = await fetchNotifications(); // Assuming this function fetches data
        setNotifications(data); // Set notifications from the fetched data
      } catch (error) {
        setError("Failed to fetch notifications."); // Set error message
        setNotifications([]); // Ensure notifications is always an array
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    getNotifications(); // Call the function to fetch notifications
  }, []); // Empty dependency array means it only runs on mount

  // Mark a notification as read
  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Return the necessary data and methods from the hook
  return {
    notifications, // The array of notifications
    loading, // Loading state
    error, // Error state
    handleMarkAsRead, // Function to mark a notification as read
  };
};

export default useNotifications;
