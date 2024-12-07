import apiClient from "./index";

// Fetch all visitors
export const fetchVisitors = async () => {
  const response = await apiClient.get("/visitors");
  return response.data;
};

// Fetch a specific visitor by ID
export const fetchVisitor = async (id) => {
  const response = await apiClient.get(`/visitors/${id}`);
  return response.data;
};

// Add a new visitor
export const addVisitor = async (visitor) => {
  const response = await apiClient.post("/visitors", visitor);
  return response.data;
};

// Update an existing visitor
export const updateVisitor = async (id, visitor) => {
  const response = await apiClient.put(`/visitors/${id}`, visitor);
  return response.data;
};

// Delete a visitor
export const deleteVisitor = async (id) => {
  const response = await apiClient.delete(`/visitors/${id}`);
  return response.data;
};
