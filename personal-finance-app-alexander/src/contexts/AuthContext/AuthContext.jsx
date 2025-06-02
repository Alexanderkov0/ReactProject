import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on first load
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Try to load token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  async function login({ email, password }) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setUser({ username: data.username });
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify({ username: data.username }));
        localStorage.setItem("token", data.token);
        return true;
      } else {
        alert(data.error || "Login failed");
        return false;
      }
    } catch (err) {
      alert("Login failed");
      return false;
    }
  }

  async function register({ username, email, password }) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please log in.");
        return true;
      } else {
        alert(data.error || "Registration failed");
        return false;
      }
    } catch (err) {
      alert("Registration failed");
      return false;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // Optional: keep user in sync with localStorage if changed elsewhere
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}