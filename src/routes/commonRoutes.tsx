import ProfileSettings from '../pages/ProfileSettings';
import StaticPage from './StaticPage';
import type { AppRoute } from './types';

export const commonRoutes: AppRoute[] = [
  { path: '/settings/profile', element: <ProfileSettings /> },
  {
    path: '/settings/terms',
    element: (
      <StaticPage
        title="Terms & Conditions"
        content="These terms govern your use of Buan Logistics platform. By accessing this dashboard, you agree to be bound by these terms and all applicable regulations. Buan Logistics reserves the right to modify these terms at any time."
      />
    ),
  },
  {
    path: '/settings/privacy',
    element: (
      <StaticPage
        title="Privacy Policy"
        content="Buan Logistics is committed to protecting your privacy. We collect only the information necessary to provide our Buan Logistics management services. Your data is never sold to third parties and is secured with industry-standard encryption."
      />
    ),
  },
];
