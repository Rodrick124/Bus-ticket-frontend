import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // While auth is being determined, avoid redirecting.
const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // While auth is being determined, avoid redirecting.
  if (isLoading) return null;

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
};

export default PrivateRoute;
