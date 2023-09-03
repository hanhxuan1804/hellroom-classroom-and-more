import axios from "axios";
import { API_URL } from "./config";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const login = (payload) => api.post(`/auth/login`, payload);
export const register = (payload) => api.post(`/auth/register`, payload);
export const verifyEmail = (payload) => api.post(`/auth/verify-email`, payload);
export const googleLogin = (payload) => api.post(`/auth/google-login`, payload);

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

export const getGroups = (payload) => api.get(`/group`, payload);
export const getGroup = (payload) => api.get(`/group/${payload}`);
export const createGroup = (payload) => api.post(`/group/create`, payload);
export const updateGroup = (payload) => api.put(`/group/update`, payload);
export const deleteGroup = (payload) => api.delete(`/group/delete/${payload}`);
export const joinGroup = (payload) => api.post(`/group/join`, payload);
export const getGroupMembers = (payload) =>
  api.get(`/group/${payload}/members`);

export const getGroupPosts = (payload) => api.get(`/group-post/${payload}`);
export const createGroupPost = (payload) =>
  api.post(`/group-post/create`, payload);
export const updateGroupPost = (payload) =>
  api.put(`/group-post/update`, payload);
export const deleteGroupPost = (payload) =>
  api.delete(`/group-post/delete`, payload);

export const getUser = (payload) => api.get(`/user/get-user/${payload}`);
export const logout = () => api.get(`/logout`);
export const getProfile = () => api.get(`/profile`);
export const updatePassword = (payload) => api.put(`/update-password`, payload);
export const forgotPassword = (payload) =>
  api.post(`/forgot-password`, payload);
export const resetPassword = (payload) => api.post(`/reset-password`, payload);
export const getAllPosts = () => api.get(`/posts`);

export const getPresentations = (payload) =>
  api.get(`/presentation/get-presentations`, payload);
export const getPresentation = (payload) =>
  api.get(`/presentation/get-presentation/${payload}`);
export const createPresentation = (payload) =>
  api.post(`/presentation/create-presentation`, payload);
export const updatePresentation = (payload) =>
  api.put(`/presentation/update-presentation`, payload);
export const deletePresentation = (payload) =>
  api.delete(`/presentation/delete-presentation`, payload);
export const updatePresentationSlides = (payload) =>
  api.put(`/presentation/update-presentation-slides`, payload);
export const showPresentation = (payload) =>
  api.post(`/presentation/show-presentation`, payload);
export const joinPresentation = (payload) =>
  api.post(`/presentation/join-presentation`, payload);

export default api;
