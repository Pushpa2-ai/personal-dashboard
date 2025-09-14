// src/api/client.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token if present
api.interceptors.request.use((config) => {
  try {
    const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
    if (tokens?.access) config.headers.Authorization = `Bearer ${tokens.access}`;
  } catch (e) {
    // ignore parse errors
  }
  return config;
});

// Auto-refresh on 401 using refresh token
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      if (!refreshing) {
        const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
        refreshing = axios
          .post(`${API_URL}/auth/refresh/`, { refresh: tokens?.refresh })
          .then((res) => {
            const next = { access: res.data.access, refresh: tokens.refresh };
            localStorage.setItem("auth", JSON.stringify(next));
            return next.access;
          })
          .catch((err) => {
            // refresh failed -> remove auth
            localStorage.removeItem("auth");
            throw err;
          })
          .finally(() => {
            refreshing = null;
          });
      }
      const newAccess = await refreshing;
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    }
    return Promise.reject(error);
  }
);

export default api;
