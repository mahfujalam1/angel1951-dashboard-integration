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
import ShipmentDetailsPage from './pages/ShipmentDetailsPage';
import ReferralProgramPage from './pages/ReferralProgramPage';
import StaffDetailsPage from './pages/StaffDetailsPage';
import HubApplicationsPage from './pages/HubApplicationsPage';
import CorporateApplicationsPage from './pages/CorporateApplicationsPage';
import UpgradeApplicationsPage from './pages/UpgradeApplicationsPage';
import HubApplicationDetailsPage from './pages/HubApplicationDetailsPage';
import CorporateApplicationDetailsPage from './pages/CorporateApplicationDetailsPage';
import UpgradeApplicationDetailsPage from './pages/UpgradeApplicationDetailsPage';
import BranchDashboard from './pages/branch/BranchDashboard';
import BranchShipments from './pages/branch/BranchShipments';
import BranchInvoices from './pages/branch/BranchInvoices';
import BranchPartners from './pages/branch/BranchPartners';
import QuoteRequestsPage from './pages/branch/QuoteRequestsPage';
import CorporateShipmentsPage from './pages/branch/CorporateShipmentsPage';
import HubManagementPage from './pages/branch/HubManagementPage';
import CreateShipmentPage from './pages/branch/CreateShipmentPage';
import BranchDetailsPage from './pages/branch/BranchDetailsPage';
import ShipmentTrackingPage from './pages/branch/ShipmentTrackingPage';
import QuoteDetailPage from './pages/branch/QuoteDetailPage';
import CorporateDetailPage from './pages/branch/CorporateDetailPage';
import HubParcelDetailPage from './pages/branch/HubParcelDetailPage';
import BranchProfilePage from './pages/branch/BranchProfilePage';

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

const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<LoginPage />} />
        <Route path="/otp-verify" element={<LoginPage />} />
        <Route path="/reset-password" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Admin Routes */}
        {user?.role === 'admin' && (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/shipments" element={<ShipmentsPage />} />
            <Route path="/shipments/:id" element={<ShipmentDetailsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/hub-applications" element={<HubApplicationsPage />} />
            <Route path="/hub-applications/:id" element={<HubApplicationDetailsPage />} />
            <Route path="/corporate-applications" element={<CorporateApplicationsPage />} />
            <Route path="/corporate-applications/:id" element={<CorporateApplicationDetailsPage />} />
            <Route path="/upgrade-applications" element={<UpgradeApplicationsPage />} />
            <Route path="/upgrade-applications/:id" element={<UpgradeApplicationDetailsPage />} />
            <Route path="/hubs" element={<HubsPage />} />
            <Route path="/hubs/:id" element={<HubDetailsPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/staff/:id" element={<StaffDetailsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/referral" element={<ReferralProgramPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </>
        )}

        {/* Branch Routes */}
        {user?.role === 'branch' && (
          <>
            <Route path="/" element={<Navigate to="/branch/dashboard" replace />} />
            <Route path="/branch/dashboard" element={<BranchDashboard />} />
            <Route path="/branch/quotes" element={<QuoteRequestsPage />} />
            <Route path="/branch/shipments" element={<BranchShipments />} />
            <Route path="/branch/shipments/:id" element={<BranchDetailsPage />} />
            <Route path="/branch/corporate-shipments" element={<CorporateShipmentsPage />} />
            <Route path="/branch/corporate-shipments/:id" element={<CorporateDetailPage />} />
            <Route path="/branch/invoices" element={<BranchInvoices />} />
            <Route path="/branch/hubs" element={<HubManagementPage />} />
            <Route path="/branch/hubs/parcels/:id" element={<HubParcelDetailPage />} />
            <Route path="/branch/create-shipment" element={<CreateShipmentPage />} />
            <Route path="/branch/quotes/:id" element={<QuoteDetailPage />} />
            <Route path="/branch/track/:id" element={<ShipmentTrackingPage />} />
            <Route path="/branch/profile" element={<BranchProfilePage />} />
          </>
        )}

        {/* Common Routes */}
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/terms" element={<StaticPage title="Terms & Conditions" content="These terms govern your use of Buan Logistics platform. By accessing this dashboard, you agree to be bound by these terms and all applicable regulations. Buan Logistics reserves the right to modify these terms at any time." />} />
        <Route path="/settings/privacy" element={<StaticPage title="Privacy Policy" content="Buan Logistics is committed to protecting your privacy. We collect only the information necessary to provide our Buan Logistics management services. Your data is never sold to third parties and is secured with industry-standard encryption." />} />
        
        <Route path="*" element={<Navigate to={user?.role === 'branch' ? "/branch/dashboard" : "/"} replace />} />
      </Route>
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
