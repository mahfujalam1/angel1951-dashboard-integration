import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, Building2, UserCheck,
  CreditCard, BarChart3, Settings, LogOut, ChevronDown,
  ChevronRight, X, Menu, Truck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { key: 'shipments', label: 'Shipment Management', path: '/shipments', icon: Package },
  { key: 'users', label: 'User Management', path: '/users', icon: Users },
  { key: 'hubs', label: 'Hub Management', path: '/hubs', icon: Building2 },
  { key: 'staff', label: 'Staff Management', path: '/staff', icon: UserCheck },
  { key: 'payments', label: 'Payments & Invoices', path: '/payments', icon: CreditCard },
  { key: 'reports', label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
];

const settingsChildren = [
  { key: 'profile', label: 'Profile', path: '/settings/profile' },
  { key: 'terms', label: 'Terms & Conditions', path: '/settings/terms' },
  { key: 'privacy', label: 'Privacy Policy', path: '/settings/privacy' },
];

interface Props { collapsed: boolean; onToggle: () => void; }

const Sidebar: React.FC<Props> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(() => location.pathname.startsWith('/settings'));
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const isSettingsSection = location.pathname.startsWith('/settings');

  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" onClick={onToggle} />
      )}
      <aside
        className="fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 bg-white border-r border-slate-100"
        style={{ width: collapsed ? 0 : 240, overflow: 'hidden', minWidth: collapsed ? 0 : 240 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <Package size={18} className='text-white'/>
            </div>
            <span className="font-bold text-slate-800 text-base" style={{ fontFamily: 'Sora, sans-serif' }}>Buan Enterprise</span>
          </div>
          <button onClick={onToggle} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors lg:hidden">
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {navItems.map(({ key, label, path, icon: Icon }) => (
            <Link key={key} to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 no-underline group
                ${isActive(path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
              <Icon size={17} className={isActive(path) ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className="text-sm font-medium truncate">{label}</span>
              {isActive(path) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </Link>
          ))}

          {/* Settings */}
          <div className="mt-1">
            <div
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                ${isSettingsSection ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Settings size={17} className={isSettingsSection ? 'text-blue-600' : 'text-slate-400'} />
              <span className="text-sm font-medium flex-1 text-left">Settings</span>
              {settingsOpen ? <ChevronDown size={13} className="text-slate-400" /> : <ChevronRight size={13} className="text-slate-400" />}
            </div>
            {settingsOpen && (
              <div className="mt-1 ml-8 space-y-0.5">
                {settingsChildren.map(sub => (
                  <Link key={sub.key} to={sub.path}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors no-underline
                      ${isActive(sub.path) ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-3 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-medium"
          >
            <LogOut size={17} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
