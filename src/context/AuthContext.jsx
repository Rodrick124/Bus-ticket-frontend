import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Safely initialize user from localStorage using a lazy initializer
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      return null;
    }
  });

  // Loading flag (useful for async bootstrapping or checking session validity)
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const login = (userData) => {
    if (!userData || typeof userData !== 'object') return;

    // Helper to create a simple avatar URL when none is provided
    const makeAvatar = (name) => {
      const safeName = name ? String(name) : 'User';
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=0D8ABC&color=fff&rounded=true&size=128`;
    };

    // Sanitize and persist only non-sensitive display fields
    const sanitized = {
      id: userData.id ?? null,
      displayName: userData.displayName ?? userData.name ?? null,
      profileImage: userData.profileImage || makeAvatar(userData.displayName ?? userData.name),
    };

    setUser(sanitized);
    try {
      localStorage.setItem('user', JSON.stringify(sanitized));
    } catch (err) {
      console.error('Failed to persist user to localStorage', err);
    }

    // NOTE: access tokens/refresh tokens should be stored in httpOnly cookies set by the backend
    // or kept in memory. Do not persist secrets to localStorage.
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (err) {
      console.error('Failed to remove user from localStorage', err);
    }
    navigate('/login'); // Redirect to login page after logout
  };

  const isLoggedIn = !!user; // Convert user object presence to boolean

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
