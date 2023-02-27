import axios from "axios";
const token = window.localStorage.getItem("token").toString();
const authorization = `Bearer ${token.slice(1, -1)}`;
token && (axios.defaults.headers.common["Authorization"] = authorization);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (payload) => api.post(`/auth/login`, payload);
export const register = (payload) => api.post(`/auth/register`, payload);
export const verifyEmail = (payload) => api.post(`/auth/verify-email`, payload);
export const resendVerificationEmail = (payload) =>
  api.post(`/resend-verification-email`, payload);
export const updateProfile = (payload) => api.put(`/user/update`, payload);
export const uploadAvatar = (payload) => {
  return api.post(`/user/upload-avatar`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUser = () => api.get(`/user`);
export const logout = () => api.get(`/logout`);
export const getProfile = () => api.get(`/profile`);
export const updatePassword = (payload) => api.put(`/update-password`, payload);
export const forgotPassword = (payload) =>
  api.post(`/forgot-password`, payload);
export const resetPassword = (payload) => api.post(`/reset-password`, payload);
export const getAllPosts = () => api.get(`/posts`);

export default api;
