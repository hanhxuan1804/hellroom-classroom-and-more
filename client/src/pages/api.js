import axios from 'axios';
const token = localStorage.getItem('token');
token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

export const login = payload => api.post(`/auth/login`, payload);
export const register = payload => api.post(`/auth/register`, payload);
export const verifyEmail = payload => api.post(`/auth/verify-email`, payload);
export const resendVerificationEmail = payload => api.post(`/resend-verification-email`, payload);
export const getUser = () => api.get(`/user`);
export const logout = () => api.get(`/logout`);
export const getProfile = () => api.get(`/profile`);
export const updateProfile = payload => api.put(`/profile`, payload);
export const updatePassword = payload => api.put(`/update-password`, payload);
export const forgotPassword = payload => api.post(`/forgot-password`, payload);
export const resetPassword = payload => api.post(`/reset-password`, payload);
export const getAllPosts = () => api.get(`/posts`);

export default api;

