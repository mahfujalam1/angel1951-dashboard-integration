import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipmentsPage from './pages/ShipmentsPage';
import UsersPage from './pages/UsersPage';
import HubsPage from './pages/HubsPage';
import HubDetailsPage from './pages/HubDetailsPage';
import StaffPage from './pages/StaffPage';
import PaymentsPage from './pages/PaymentsPage';
import ReportsPage from './pages/ReportsPage';
import ProfileSettings from './pages/ProfileSettings';

const antTheme = {
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 10,
    fontFamily: "'DM Sans', sans-serif",
    colorBgContainer: '#ffffff',
    colorBorder: '#e2e8f0',
    controlHeight: 38,
  },
  components: {
    Button: { borderRadius: 10, fontWeight: 500 },
    Input: { borderRadius: 10 },
    Select: { borderRadius: 10 },
    Modal: { borderRadius: 20 },
  },
};

const StaticPage: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
    <h2 className="text-lg font-bold text-slate-800 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h2>
    <p className="text-slate-500 text-sm leading-relaxed">{content}</p>
  </div>
);

const ProtectedRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/shipments" element={<ShipmentsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/hubs" element={<HubsPage />} />
        <Route path="/hubs/:id" element={<HubDetailsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/terms" element={<StaticPage title="Terms & Conditions" content="These terms govern your use of Buan Enterprise platform. By accessing this dashboard, you agree to be bound by these terms and all applicable regulations. Buan Enterprise reserves the right to modify these terms at any time." />} />
        <Route path="/settings/privacy" element={<StaticPage title="Privacy Policy" content="Buan Enterprise is committed to protecting your privacy. We collect only the information necessary to provide our buan enterprise management services. Your data is never sold to third parties and is secured with industry-standard encryption." />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <ConfigProvider theme={antTheme}>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </ConfigProvider>
);

export default App;
