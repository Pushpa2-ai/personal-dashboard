// src/api/auth.js
import api from "./client";

/**
 * Login: expects response { access, refresh } (TokenObtainPairView)
 */
export async function login(username, password) {
  const res = await api.post("/auth/login/", { username, password });
  // res.data should have access and refresh
  localStorage.setItem("auth", JSON.stringify({ access: res.data.access, refresh: res.data.refresh }));
  return res.data;
}

/**
 * Register: returns user + tokens if you implemented that
 */
export async function register(username, email, password) {
  const res = await api.post("/auth/register/", { username, email, password });
  // register view earlier returned { user, access, refresh }
  if (res.data.access && res.data.refresh) {
    localStorage.setItem("auth", JSON.stringify({ access: res.data.access, refresh: res.data.refresh }));
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem("auth");
}
