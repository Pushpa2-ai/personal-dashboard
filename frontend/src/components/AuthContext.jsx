// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // initialize from localStorage
    try {
      const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
      if (tokens?.access) {
        setUser({ authenticated: true });
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  const loginFn = async (loginFunc, username, password) => {
    // loginFunc should be imported from src/api/auth and passed in
    const result = await loginFunc(username, password);
    setUser({ authenticated: true });
    return result;
  };

  const registerFn = async (registerFunc, username, email, password) => {
    const result = await registerFunc(username, email, password);
    setUser({ authenticated: true });
    return result;
  };

  const logoutFn = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginFn, registerFn, logoutFn }}>
      {children}
    </AuthContext.Provider>
  );
}
