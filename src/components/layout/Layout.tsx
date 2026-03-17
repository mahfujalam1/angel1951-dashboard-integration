import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar collapsed={!sidebarOpen} onToggle={() => setSidebarOpen(p => !p)} />
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 240 : 0 }}
      >
        <Topbar onMenuToggle={() => setSidebarOpen(p => !p)} />
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <div className="page-fade max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
