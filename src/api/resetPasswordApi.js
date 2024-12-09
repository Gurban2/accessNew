import apiClient from "./index";

export const resetPassword = (
  email,
  token,
  password,
  password_confirmation,
) => {
  if (!email || !token || !password || !password_confirmation) {
    throw new Error(
      "All fields are required: reset token, new password, and confirmation.",
    );
  }

  if (password !== password_confirmation) {
    throw new Error("Passwords do not match.");
  }

  return apiClient
    .post("/auth/reset", { email, token, password, password_confirmation })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
};
