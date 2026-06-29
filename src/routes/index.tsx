import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import AuthRoutes from './authRoutes';
import { adminRoutes } from './adminRoutes';
import { branchRoutes } from './branchRoutes';
import { commonRoutes } from './commonRoutes';
import type { AppRoute } from './types';

const renderRoutes = (routes: AppRoute[]) =>
  routes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <AuthRoutes />;
  }

  const roleRoutes =
    user?.role === 'admin'
      ? adminRoutes
      : user?.role === 'branch'
        ? branchRoutes
        : [];

  return (
    <Routes>
      <Route element={<Layout />}>
        {renderRoutes(roleRoutes)}
        {renderRoutes(commonRoutes)}
        <Route
          path="*"
          element={
            <Navigate
              to={user?.role === 'branch' ? '/branch/dashboard' : '/'}
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
