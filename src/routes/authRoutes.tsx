import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import type { AppRoute } from './types';

export const authRoutes: AppRoute[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <LoginPage /> },
  { path: '/otp-verify', element: <LoginPage /> },
  { path: '/reset-password', element: <LoginPage /> },
];

const AuthRoutes = () => (
  <Routes>
    {authRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AuthRoutes;
