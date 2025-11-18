import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Attach access token to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");  // your stored access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token when expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired → 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refreshToken");

      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Call refresh endpoint
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refresh,
        });

        // Save new access token
        localStorage.setItem("accessToken", res.data.access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);

      } catch (refreshError) {
        // Refresh token expired → force logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
