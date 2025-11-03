import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/utils';

const PublicRoute = ({ children }) => {
  return !getToken() ? children : <Navigate to="/dashboard"/>;
};

export default PublicRoute;
