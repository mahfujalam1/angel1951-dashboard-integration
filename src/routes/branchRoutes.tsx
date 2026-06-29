import { Navigate } from 'react-router-dom';
import BranchDashboard from '../pages/branch/BranchDashboard';
import BranchShipments from '../pages/branch/BranchShipments';
import BranchInvoices from '../pages/branch/BranchInvoices';
import QuoteRequestsPage from '../pages/branch/QuoteRequestsPage';
import CorporateShipmentsPage from '../pages/branch/CorporateShipmentsPage';
import HubManagementPage from '../pages/branch/HubManagementPage';
import CreateShipmentPage from '../pages/branch/CreateShipmentPage';
import BranchDetailsPage from '../pages/branch/BranchDetailsPage';
import ShipmentTrackingPage from '../pages/branch/ShipmentTrackingPage';
import QuoteDetailPage from '../pages/branch/QuoteDetailPage';
import CorporateDetailPage from '../pages/branch/CorporateDetailPage';
import HubParcelDetailPage from '../pages/branch/HubParcelDetailPage';
import BranchProfilePage from '../pages/branch/BranchProfilePage';
import type { AppRoute } from './types';

export const branchRoutes: AppRoute[] = [
  { path: '/', element: <Navigate to="/branch/dashboard" replace /> },
  { path: '/branch/dashboard', element: <BranchDashboard /> },
  { path: '/branch/quotes', element: <QuoteRequestsPage /> },
  { path: '/branch/shipments', element: <BranchShipments /> },
  { path: '/branch/shipments/:id', element: <BranchDetailsPage /> },
  { path: '/branch/corporate-shipments', element: <CorporateShipmentsPage /> },
  { path: '/branch/corporate-shipments/:id', element: <CorporateDetailPage /> },
  { path: '/branch/invoices', element: <BranchInvoices /> },
  { path: '/branch/hubs', element: <HubManagementPage /> },
  { path: '/branch/hubs/parcels/:id', element: <HubParcelDetailPage /> },
  { path: '/branch/create-shipment', element: <CreateShipmentPage /> },
  { path: '/branch/quotes/:id', element: <QuoteDetailPage /> },
  { path: '/branch/track/:id', element: <ShipmentTrackingPage /> },
  { path: '/branch/profile', element: <BranchProfilePage /> },
];
