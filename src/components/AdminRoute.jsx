import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Spinner from './Spinner';

export default function AdminRoute() {
  const { isAdmin, checkingStatus } = useContext(UserContext);

  if (checkingStatus) {
    return <Spinner />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}