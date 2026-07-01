import React, { useState, useEffect } from 'react';
import { Modal, message, Skeleton, Select } from 'antd';
import { Package, Truck, Warehouse, Navigation, PackageCheck, CheckCircle2, Eye } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import { UserGrowthChart, EarningsChart } from '../components/charts/Charts';
import { userGrowthData, earningGrowthData } from '../data/mockData';
import type { HubRequest } from '../types';
import { useGetAdminDashboardStatsQuery } from '../redux/api/statsApi';

const DashboardPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const { data: statsRes, isLoading: statsLoading, isFetching: statsFetching } = useGetAdminDashboardStatsQuery({ year: selectedYear });

  const [requests, setRequests] = useState<HubRequest[]>([]);
  const [detailModal, setDetailModal] = useState<HubRequest | null>(null);

  useEffect(() => {
    if (statsRes?.success && statsRes.data) {
      const { pendingHubRequests = [], pendingBusinessRequests = [] } = statsRes.data;
      
      const mappedHubs = pendingHubRequests.map((req: any) => ({
        id: req.id,
        type: 'hub',
        hub: req.shopName,
        phone: req.contact,
        location: `${req.address}, ${req.cityOrState}`,
        store: req.shopName,
      }));

      const mappedPartners = pendingBusinessRequests.map((req: any) => ({
        id: req.id,
        type: 'partner',
        hub: req.companyName,
        phone: req.phone,
        location: `${req.address}, ${req.country}`,
        store: req.tradingName || req.companyName,
      }));

      setRequests([...mappedHubs, ...mappedPartners]);
    }
  }, [statsRes]);

  const handleAccept = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    message.success('Request accepted successfully!');
  };
  const handleDecline = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    message.error('Request declined.');
  };

  const metrics = statsRes?.data?.metrics || {};

  const shipmentStats = [
    { label: 'Total Created', value: metrics.totalCreated || 0, icon: <Package size={18} />, color: '#2563eb' },
    { label: 'Total Picked',  value: metrics.totalPicked || 0,  icon: <PackageCheck size={18} />, color: '#7c3aed' },
    { label: 'At Hub',        value: metrics.atHub || 0,        icon: <Warehouse size={18} />, color: '#0891b2' },
    { label: 'In Transit',    value: metrics.inTransit || 0,    icon: <Navigation size={18} />, color: '#d97706' },
    { label: 'Out Delivery',  value: metrics.outDelivery || 0,  icon: <Truck size={18} />, color: '#dc2626' },
    { label: 'Delivered',     value: metrics.delivered || 0,    icon: <CheckCircle2 size={18} />, color: '#059669' },
  ];

  const RequestTable = ({ data, title, loading }: { data: HubRequest[]; title: string; loading?: boolean }) => (
    <Card title={title} noPad
      extra={
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {data.length} pending
        </span>
      }
    >
      {loading ? (
        <div className="p-5"><Skeleton active /></div>
      ) : data.length === 0 ? (
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
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100 cursor-pointer">
                        Accept
                      </div>
                      <div onClick={() => handleDecline(req.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100 cursor-pointer">
                        Decline
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => setDetailModal(req)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
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

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - 2 + i;
    return { value: year, label: year.toString() };
  });

  const YearSelector = () => (
    <Select
      value={selectedYear}
      onChange={setSelectedYear}
      options={yearOptions}
      size="small"
      className="w-20"
      variant="filled"
    />
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {shipmentStats.map(s => (
          <StatCard key={s.label} label={s.label} value={statsLoading ? '...' : s.value} icon={s.icon} color={s.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <Card title="User Growth" extra={<YearSelector />}>
          {statsFetching && !statsLoading ? (
             <div className="h-[195px] flex items-center justify-center"><Skeleton active /></div>
          ) : (
             <UserGrowthChart data={statsRes?.data?.userGrowth || userGrowthData} height={195} />
          )}
        </Card>
        <Card title="Earning Growth" extra={<YearSelector />}>
          {statsFetching && !statsLoading ? (
             <div className="h-[195px] flex items-center justify-center"><Skeleton active /></div>
          ) : (
             <EarningsChart data={statsRes?.data?.earningGrowth || earningGrowthData} height={195} />
          )}
        </Card>
      </div>

      <RequestTable data={requests.filter(r => r.type === 'hub')} title="New Hub Requests" loading={statsLoading} />
      <RequestTable data={requests.filter(r => r.type === 'partner')} title="New Business Partner Requests" loading={statsLoading} />

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
                <div key={item.label} className="bg-slate-50 rounded p-3">
                  <p className="text-xs text-slate-400 font-medium mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-700 capitalize">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <div onClick={() => { handleAccept(detailModal.id); setDetailModal(null); }}
                className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors text-center cursor-pointer">
                Accept Request
              </div>
              <div onClick={() => { handleDecline(detailModal.id); setDetailModal(null); }}
                className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-center cursor-pointer">
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

