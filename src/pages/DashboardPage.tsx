import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Package, Truck, Warehouse, Navigation, PackageCheck, CheckCircle2, ArrowUpRight, Eye } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { UserGrowthChart, EarningsChart } from '../components/charts/Charts';
import { userGrowthData, earningGrowthData, hubRequests } from '../data/mockData';
import type { HubRequest } from '../types';

const shipmentStats = [
  { label: 'Total Created', value: 125, icon: <Package size={18} />, color: '#2563eb', trend: 12 },
  { label: 'Total Picked',  value: 98,  icon: <PackageCheck size={18} />, color: '#7c3aed', trend: 8 },
  { label: 'At Hub',        value: 34,  icon: <Warehouse size={18} />, color: '#0891b2', trend: -3 },
  { label: 'In Transit',    value: 47,  icon: <Navigation size={18} />, color: '#d97706', trend: 5 },
  { label: 'Out Delivery',  value: 22,  icon: <Truck size={18} />, color: '#dc2626', trend: 2 },
  { label: 'Delivered',     value: 125, icon: <CheckCircle2 size={18} />, color: '#059669', trend: 18 },
];

const DashboardPage: React.FC = () => {
  const [requests, setRequests] = useState<HubRequest[]>(hubRequests);
  const [detailModal, setDetailModal] = useState<HubRequest | null>(null);

  const handleAccept = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    message.success('Request accepted successfully!');
  };
  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    message.error('Request declined.');
  };

  const RequestTable = ({ data, title }: { data: HubRequest[]; title: string }) => (
    <Card title={title} noPad
      extra={
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {data.length} pending
        </span>
      }
    >
      {data.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-sm">No pending requests</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['S.N', 'Hub / Store', 'Location', 'Store Name', 'Action', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((req, i) => (
                <tr key={req.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 text-slate-400 text-xs font-medium">{i + 1}.</td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-slate-700 capitalize">{req.hub}</div>
                    <div className="text-xs text-slate-400">{req.phone}</div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 text-sm">{req.location}</td>
                  <td className="px-5 py-3.5 text-slate-600 text-sm">{req.store}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div onClick={() => handleAccept(req.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100">
                        Accept
                      </div>
                      <div onClick={() => handleDecline(req.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100">
                        Decline
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => setDetailModal(req)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {shipmentStats.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} trend={s.trend} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="User Growth" extra={<span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">2026</span>}>
          <UserGrowthChart data={userGrowthData} height={195} />
        </Card>
        <Card title="Earning Growth" extra={<span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">2026</span>}>
          <EarningsChart data={earningGrowthData} height={195} />
        </Card>
      </div>

      <RequestTable data={requests.filter(r => r.type === 'hub')} title="New Hub Requests" />
      <RequestTable data={requests.filter(r => r.type === 'partner')} title="New Business Partner Requests" />

      {/* Detail Modal */}
      <Modal open={!!detailModal} onCancel={() => setDetailModal(null)} footer={null} title="Request Details" width={440}>
        {detailModal && (
          <div className="pt-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Hub Name', value: detailModal.hub },
                { label: 'Phone', value: detailModal.phone },
                { label: 'Location', value: detailModal.location },
                { label: 'Store', value: detailModal.store },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-700 capitalize">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <div onClick={() => { handleAccept(detailModal.id); setDetailModal(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Accept Request
              </div>
              <div onClick={() => { handleDecline(detailModal.id); setDetailModal(null); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                Decline
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;
