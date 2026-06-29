import DashboardPage from '../pages/DashboardPage';
import ShipmentsPage from '../pages/ShipmentsPage';
import ShipmentDetailsPage from '../pages/ShipmentDetailsPage';
import UsersPage from '../pages/UsersPage';
import HubApplicationsPage from '../pages/HubApplicationsPage';
import HubApplicationDetailsPage from '../pages/HubApplicationDetailsPage';
import CorporateApplicationsPage from '../pages/CorporateApplicationsPage';
import CorporateApplicationDetailsPage from '../pages/CorporateApplicationDetailsPage';
import UpgradeApplicationsPage from '../pages/UpgradeApplicationsPage';
import UpgradeApplicationDetailsPage from '../pages/UpgradeApplicationDetailsPage';
import HubsPage from '../pages/HubsPage';
import HubDetailsPage from '../pages/HubDetailsPage';
import StaffPage from '../pages/StaffPage';
import StaffDetailsPage from '../pages/StaffDetailsPage';
import PaymentsPage from '../pages/PaymentsPage';
import ReferralProgramPage from '../pages/ReferralProgramPage';
import ReportsPage from '../pages/ReportsPage';
import type { AppRoute } from './types';

export const adminRoutes: AppRoute[] = [
  { path: '/', element: <DashboardPage /> },
  { path: '/shipments', element: <ShipmentsPage /> },
  { path: '/shipments/:id', element: <ShipmentDetailsPage /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/hub-applications', element: <HubApplicationsPage /> },
  { path: '/hub-applications/:id', element: <HubApplicationDetailsPage /> },
  { path: '/corporate-applications', element: <CorporateApplicationsPage /> },
  { path: '/corporate-applications/:id', element: <CorporateApplicationDetailsPage /> },
  { path: '/upgrade-applications', element: <UpgradeApplicationsPage /> },
  { path: '/upgrade-applications/:id', element: <UpgradeApplicationDetailsPage /> },
  { path: '/hubs', element: <HubsPage /> },
  { path: '/hubs/:id', element: <HubDetailsPage /> },
  { path: '/staff', element: <StaffPage /> },
  { path: '/staff/:id', element: <StaffDetailsPage /> },
  { path: '/payments', element: <PaymentsPage /> },
  { path: '/referral', element: <ReferralProgramPage /> },
  { path: '/reports', element: <ReportsPage /> },
];
