import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Building2,
  UserCheck,
  CreditCard,
  LogOut,
  X,
  Truck,
  Gift,
  FileText,
  User,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const adminNavItems = [
  { key: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
  {
    key: "shipments",
    label: "Shipment Management",
    path: "/shipments",
    icon: Package,
  },
  { key: "users", label: "User Management", path: "/users", icon: Users },
  { key: "hub-applications", label: "Hub Applications", path: "/hub-applications", icon: Building2 },
  { key: "corporate-applications", label: "Corporate Applications", path: "/corporate-applications", icon: Building2 },
  { key: "upgrade-applications", label: "Upgrade Applications", path: "/upgrade-applications", icon: ArrowUpRight },
  { key: "branches", label: "Branch Management", path: "/branches", icon: Building2 },
  { key: "hubs", label: "Hub Management", path: "/hubs", icon: Building2 },
  { key: "staff", label: "Staff Management", path: "/staff", icon: UserCheck },
  {
    key: "payments",
    label: "Payments & Invoices",
    path: "/payments",
    icon: CreditCard,
  },
  { key: "referral", label: "Referral Program", path: "/referral", icon: Gift },
  {
    key: "reports",
    label: "Reports & Analytics",
    path: "/reports",
    icon: BarChart3,
  },
];

const branchNavItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/branch/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "quote-requests",
    label: "Quote Requests",
    path: "/branch/quotes",
    icon: FileText,
  },
  {
    key: "shipments",
    label: "Shipments",
    path: "/branch/shipments",
    icon: Package,
  },
  {
    key: "corporate-shipments",
    label: "Corporate Shipments",
    path: "/branch/corporate-shipments",
    icon: Building2,
  },
  {
    key: "invoices",
    label: "Invoices",
    path: "/branch/invoices",
    icon: CreditCard,
  },
  {
    key: "partners",
    label: "Hub Management",
    path: "/branch/hubs",
    icon: Truck,
  },
];

const settingsChildren = [
  { key: "profile", label: "Profile", path: "/settings/profile" },
  { key: "terms", label: "Terms & Conditions", path: "/settings/terms" },
  { key: "privacy", label: "Privacy Policy", path: "/settings/privacy" },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<Props> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navItems = user?.role === "branch" ? branchNavItems : adminNavItems;
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className="fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 bg-white border-r border-slate-100"
        style={{
          width: collapsed ? 0 : 275,
          overflow: "hidden",
          minWidth: collapsed ? 0 : 275,
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div>
              <img src="/buan-logo.png" className="h-8" alt="logo" />
            </div>
          </div>
          <button
            onClick={onToggle}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 transition-colors lg:hidden"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>
          {navItems.map(({ key, label, path, icon: Icon }) => (
            <Link
              key={key}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-150 no-underline group
                ${
                  isActive(path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
            >
              <Icon
                size={17}
                className={
                  isActive(path)
                    ? "text-blue-600"
                    : "text-slate-400 group-hover:text-slate-600"
                }
              />
              <span className="text-sm font-medium truncate">{label}</span>
              {isActive(path) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}

          {/* Profile Link */}
          {(() => {
            const profilePath = user?.role === "branch" ? "/branch/profile" : "/settings/profile";
            return (
              <Link
                to={profilePath}
                className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-150 no-underline group mt-1
                  ${
                    isActive(profilePath)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                <User
                  size={17}
                  className={
                    isActive(profilePath)
                      ? "text-blue-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }
                />
                <span className="text-sm font-medium">Profile</span>
                {isActive(profilePath) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                )}
              </Link>
            );
          })()}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-3 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all text-sm font-medium"
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
