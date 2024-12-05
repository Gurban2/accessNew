import apiClient from './index';

export const fetchOffices = async () => {
  const response = await apiClient.get('/offices');
  return response.data;
};

export const fetchOffice = async (id) => {
  const response = await apiClient.get(`/offices/${id}`);
  return response.data;
};

export const addOffice = async (office) => {
  const response = await apiClient.post('/offices', office);
  return response.data;
};

export const updateOffice = async (id, office) => {
  const response = await apiClient.put(`/offices/${id}`, office);
  return response.data;
};

export const deleteOffice = async (id) => {
  const response = await apiClient.delete(`/offices/${id}`);
  return response.data;
};
