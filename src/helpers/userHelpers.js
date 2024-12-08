export const isLoggedIn = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated;
};
