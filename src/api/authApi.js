import {
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../store/reducers/authReducer"; // import necessary actions
import apiClient from "../api/index";

// Login function to authenticate the user, store the token, and update Redux state
export const login = async (email, password, dispatch) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    // Save the token in localStorage if it exists
    if (token) {
      localStorage.setItem("token", token);
    }

    // Dispatch loginSuccess action to store user data and set authentication state
    dispatch(loginSuccess(response.data.user)); // Assuming user data is in response.data.user

    return response.data; // Optional: You can return the response (e.g., user details) for further use
  } catch (error) {
    // Handle error (e.g., invalid credentials)
    console.error("Login error:", error);

    // Dispatch loginFailure action to set error state
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));

    throw error; // Rethrow the error to handle it elsewhere (in your component)
  }
};

// Logout function to remove the token from localStorage and update Redux state
export const logout = (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("token");

  // Dispatch logout action to reset Redux state
  dispatch(logoutAction());
};
