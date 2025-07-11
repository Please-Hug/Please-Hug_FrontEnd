import api from './axiosInstance';
const BASE = '/api/v1/admin/users';

export const getUsers = () => api.get(BASE);
export const getUser = username => api.get(`${BASE}/${username}`);
export const updateUser = (username, data) => api.patch(`${BASE}/${username}`, data);
export const deleteUser = username => api.delete(`${BASE}/${username}`);
export const changeUserRole = (username, role) => api.patch(`${BASE}/${username}/role`, { role });
