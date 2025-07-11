import api from './axiosInstance';
const BASE = '/api/v1/admin/users';

export const getUsers = async () => {
  try {
    const response = await api.get(BASE);
    return response.data;
  } catch (error) {
    console.error("getUsers 실패:", error);
    throw error;
  }
};

export const getUser = async (username) => {
  try {
    const response = await api.get(`${BASE}/${username}`);
    return response.data;
  } catch (error) {
    console.error("getUser 실패:", error);
    throw error;
  }
};

export const updateUser = async (username, data) => {
  try {
    const response = await api.patch(`${BASE}/${username}`, data);
    return response.data;
  } catch (error) {
    console.error("updateUser 실패:", error);
    throw error;
  }
};

export const deleteUser = async (username) => {
  try {
    const response = await api.delete(`${BASE}/${username}`);
    return response.data;
  } catch (error) {
    console.error("deleteUser 실패:", error);
    throw error;
  }
};

export const changeUserRole = async (username, role) => {
  try {
    const response = await api.patch(`${BASE}/${username}/role`, { role });
    return response.data;
  } catch (error) {
    console.error("changeUserRole 실패:", error);
    throw error;
  }
};
