import axios from 'axios';
const BASE = '/api/v1/admin/users';

export const getUsers = () =>
  axios.get(BASE);                 
export const getUser  = username =>
  axios.get(`${BASE}/${username}`);
export const updateUser     = (username, data) =>
  axios.patch(`${BASE}/${username}`, data);
export const deleteUser     = username =>
  axios.delete(`${BASE}/${username}`);
export const changeUserRole = (username, role) =>
  axios.patch(`${BASE}/${username}/role`, { role });
