import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Mock user data
const MOCK_USER = {
  username: "demo@user.com",
  password: "password123",
  name: "Demo User"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on first load
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function login({ email, password }) {
    // Simulate authentication with mock user
    if (email === MOCK_USER.username && password === MOCK_USER.password) {
      const userObj = { username: MOCK_USER.username, name: MOCK_USER.name };
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      return true;
    } else {
      alert("Invalid credentials (try demo@user.com / password123)");
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // Optional: keep user in sync with localStorage if changed elsewhere
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}