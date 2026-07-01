import React from 'react';
import { Badge, Dropdown } from 'antd';
import { Bell, Menu, ChevronDown, LogOut, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';
import { useGetProfileQuery } from '../../redux/api/auth/authApi';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/shipments': 'Shipment Management',
  '/users': 'User Management',
  '/hubs': 'Hub Management',
  '/staff': 'Staff Management',
  '/payments': 'Payments & Invoices',
  '/reports': 'Reports & Analytics',
  '/settings/profile': 'Profile Settings',
  '/settings/terms': 'Terms & Conditions',
  '/settings/privacy': 'Privacy Policy',
};

interface Props { onMenuToggle: () => void; }

const Topbar: React.FC<Props> = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();
  const { data: profileRes } = useGetProfileQuery(undefined);
  
  const user = profileRes?.data;
  const profile = user?.profile;
  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : authUser?.name;
  const role = user?.role || authUser?.role;
  const baseUrl = (import.meta as any).env.VITE_SERVER_URL;
  const avatarUrl = profile?.avatar ? (profile.avatar.startsWith('http') ? profile.avatar : `${baseUrl}${profile.avatar}`) : null;

  const title = pageTitles[location.pathname] || 'Dashboard';

  const menuItems = [
    { key: 'profile', label: <div className="flex items-center gap-2"><User size={14} /> Profile</div>, onClick: () => navigate('/settings/profile') },
    { type: 'divider' as const },
    { key: 'logout', label: <div className="flex items-center gap-2 text-red-500"><LogOut size={14} /> Log Out</div>, onClick: logout },
  ];

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-5 gap-4">
      <div className="flex items-center gap-3 ml-5 cursor-pointer group">
        <p onClick={onMenuToggle}
          className="w-9 h-9 flex items-center justify-center rounded hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer">
          <Menu size={19} />
        </p>
        <div onClick={onMenuToggle} className="cursor-pointer">
          <h2 className="text-sm font-bold text-slate-800 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{role}</h2>
          <p className="text-xs text-slate-400">Welcome back, {fullName}!</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded hover:bg-slate-50 transition-colors ml-1 shadow-sm bg-gray-100 border cursor-pointer">
            <Avatar name={fullName || 'Admin'} src={avatarUrl} size={32} className="cursor-pointer" />
            <div className="hidden sm:block text-left cursor-pointer">
              <div className="text-xs font-semibold text-slate-700 leading-tight cursor-pointer">{fullName}</div>
              <div className="text-xs text-slate-400 cursor-pointer">{role}</div>
            </div>
            <ChevronDown size={13} className="text-slate-400 hidden sm:block" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Topbar;
