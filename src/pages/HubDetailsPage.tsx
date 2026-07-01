import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, DollarSign, Building2, MapPin } from 'lucide-react';
import { Button, Modal, Select, message, Skeleton, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Card from '../components/ui/Card';
import AppTable from '../components/ui/AppTable';
import { 
  useGetHubByIdQuery, 
  useGetHubCommissionsQuery, 
  useAssignHubProviderMutation,
  usePayHubCommissionMutation 
} from '../redux/api/branchesApi';
import { useGetUsersQuery } from '../redux/api/usersApi';

const HubDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('');

  const { data: hubRes, isLoading: hubLoading } = useGetHubByIdQuery(id as string, { skip: !id });
  const hub = hubRes?.data;

  const [commPage, setCommPage] = useState(1);
  const { data: commRes, isLoading: commLoading, isFetching: commFetching } = useGetHubCommissionsQuery({ id: id as string, page: commPage, limit: 10 }, { skip: !id });
  const rawComm = commRes?.data?.commissions || commRes?.data?.data || commRes?.data?.results || commRes?.data;
  const commissions = Array.isArray(rawComm) ? rawComm : [];
  const commTotal = commRes?.data?.pagination?.totalItems || commRes?.data?.total || commissions.length || 0;

  const { data: usersRes } = useGetUsersQuery({ limit: 100 });
  const rawUsers = usersRes?.data?.users || usersRes?.data?.data || usersRes?.data?.results || usersRes?.data;
  const users = Array.isArray(rawUsers) ? rawUsers : [];

  const [assignProvider, { isLoading: isAssigning }] = useAssignHubProviderMutation();
  const [payCommission, { isLoading: isPaying }] = usePayHubCommissionMutation();

  const handleAssignProvider = async () => {
    if (!selectedProvider) return message.error('Please select a provider');
    try {
      await assignProvider({ id: id as string, providerId: selectedProvider }).unwrap();
      message.success('Provider assigned successfully');
      setIsAssignModalOpen(false);
      setSelectedProvider('');
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to assign provider');
    }
  };

  const handlePayCommission = async (commissionId: string) => {
    try {
      await payCommission({ commissionId, hubId: id as string }).unwrap();
      message.success('Commission paid successfully');
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to pay commission');
    }
  };

  const commColumns: ColumnsType<any> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: (v: string) => <span className="text-xs font-mono text-slate-400">#{v?.substring(0, 5)}</span> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (v: number) => <span className="font-semibold text-green-600">${v?.toFixed(2)}</span> },
    { title: 'Package ID', dataIndex: 'packageId', key: 'packageId', render: (v: string) => <span className="text-sm font-mono text-slate-600">{v || 'N/A'}</span> },
    { 
      title: 'Status', dataIndex: 'status', key: 'status', 
      render: (s: string) => (
        <Tag color={s === 'PAID' ? 'success' : 'warning'}>{s}</Tag>
      ) 
    },
    {
      title: 'Action', key: 'action', width: 100,
      render: (_: any, r: any) => (
        <Button 
          type="primary" 
          size="small" 
          disabled={r.status === 'PAID' || isPaying}
          onClick={() => handlePayCommission(r.id)}
          className="bg-blue-600 cursor-pointer"
        >
          {r.status === 'PAID' ? 'Paid' : 'Pay'}
        </Button>
      )
    }
  ];

  if (hubLoading) return <div className="p-10"><Skeleton active /></div>;
  if (!hub) return <div className="p-10 text-center text-slate-500">Hub not found</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 shadow-sm cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Hub Details</h1>
        </div>
        <Button type="primary" onClick={() => setIsAssignModalOpen(true)} className="bg-blue-600 cursor-pointer" style={{ borderRadius: 4 }}>
          Assign Provider
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                {hub.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={14} className="text-slate-400" />
                {hub.address}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-400 mb-1">Branch</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Building2 size={14} className="text-blue-500" />
                  {hub.branch?.name || 'N/A'}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Provider</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <User size={14} className="text-blue-500" />
                  {hub.hubProvider ? `${hub.hubProvider.firstName} ${hub.hubProvider.lastName}` : 'Unassigned'}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Commission Rate</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <DollarSign size={14} />
                  {hub.commissionPerPackage || 0} / package
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-white rounded p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Commissions History</h3>
        
        {commLoading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <AppTable 
            columns={commColumns} 
            data={commissions}
            total={commTotal} 
            pageSize={10} 
            current={commPage} 
            onPageChange={setCommPage} 
            loading={commFetching} 
          />
        )}
      </div>

      <Modal
        title="Assign Hub Provider"
        open={isAssignModalOpen}
        onCancel={() => setIsAssignModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsAssignModalOpen(false)} style={{ borderRadius: 4 }} className="cursor-pointer">
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={isAssigning} onClick={handleAssignProvider} className="bg-blue-600 cursor-pointer" style={{ borderRadius: 4 }}>
            Assign
          </Button>,
        ]}
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select User</label>
          <Select
            showSearch
            className="w-full"
            placeholder="Search to Select Provider"
            optionFilterProp="children"
            value={selectedProvider}
            onChange={setSelectedProvider}
            style={{ borderRadius: 4 }}
          >
            {users.map((u: any) => (
              <Select.Option key={u.id} value={u.id}>
                {u.firstName} {u.lastName} ({u.email})
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default HubDetailsPage;
