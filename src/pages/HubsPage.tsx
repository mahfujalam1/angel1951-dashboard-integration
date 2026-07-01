import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Dropdown, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Edit, Trash2, MoreVertical, Power, MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import { useGetHubsQuery, useCreateHubMutation, useGetBranchesQuery } from '../redux/api/branchesApi';
import { useGetUsersQuery } from '../redux/api/usersApi';

const HubsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: response, isLoading, isFetching } = useGetHubsQuery({ page, limit: 10, search });
  const [createHub, { isLoading: isCreating }] = useCreateHubMutation();

  const { data: branchesRes } = useGetBranchesQuery({ limit: 100 });
  const { data: usersRes } = useGetUsersQuery({ limit: 100 });

  const rawHubs = response?.data?.hubs || response?.data?.data || response?.data?.results || response?.data;
  const hubs = Array.isArray(rawHubs) ? rawHubs : [];
  const total = response?.data?.pagination?.totalItems || response?.data?.total || hubs.length || 0;

  const rawBranches = branchesRes?.data?.branches || branchesRes?.data?.data || branchesRes?.data?.results || branchesRes?.data;
  const branches = Array.isArray(rawBranches) ? rawBranches : [];

  const rawUsers = usersRes?.data?.users || usersRes?.data?.data || usersRes?.data?.results || usersRes?.data;
  const users = Array.isArray(rawUsers) ? rawUsers : [];

  const handleCreate = async (values: any) => {
    try {
      await createHub({
        ...values,
        commissionPerPackage: parseFloat(values.commissionPerPackage) || 0,
      }).unwrap();
      message.success('Hub created!');
      setCreateModal(false);
      form.resetFields();
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to create hub');
    }
  };

  const getActions = (r: any) => [
    { key: 'view',   label: <span className="flex items-center gap-2"><Eye size={14} /> View Details</span>,    onClick: () => navigate(`/hubs/${r.id}`) },
    { type: 'divider' as const },
    { key: 'delete', label: <span className="flex items-center gap-2 text-red-500"><Trash2 size={14} /> Delete Hub</span>, onClick: () => message.warning('Delete API not implemented'), danger: true },
  ];

  const columns: ColumnsType<any> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 75, render: (v: string) => <span className="text-xs font-mono text-slate-400">#{v?.substring(0, 5)}</span> },
    { title: 'Hub Name', dataIndex: 'name', key: 'name', render: (v: string) => <span className="font-semibold text-sm text-slate-800">{v}</span> },
    {
      title: 'Branch', dataIndex: 'branch', key: 'branch',
      render: (b: any) => b ? (
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <Building2 size={12} className="text-blue-400" /> {b.name}
        </div>
      ) : <span className="text-slate-400 text-sm">N/A</span>,
    },
    {
      title: 'Provider', dataIndex: 'hubProvider', key: 'hubProvider',
      render: (p: any) => p ? <span className="text-sm font-medium text-slate-700">{p.firstName} {p.lastName}</span> : <span className="text-slate-400 text-sm">Unassigned</span>,
    },
    {
      title: 'Address', dataIndex: 'address', key: 'address',
      render: (v: string) => (
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin size={12} className="text-slate-400" /> {v}
        </div>
      ),
    },
    { title: 'Commission', dataIndex: 'commissionPerPackage', key: 'commissionPerPackage', render: (v: number) => <span className="text-sm font-mono text-green-600">${v || 0}</span> },
    {
      title: 'Actions', key: 'actions', fixed: 'right' as const, width: 90,
      render: (_: unknown, r: any) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/hubs/${r.id}`)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
            <Eye size={15} />
          </button>
          <Dropdown menu={{ items: getActions(r) }} trigger={['click']} placement="bottomRight">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer">
              <MoreVertical size={15} />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const HubForm = ({ onFinish }: { onFinish: (v: any) => void }) => (
    <Form form={form} layout="vertical" onFinish={onFinish} className="pt-3">
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item label="Hub Name" name="name" rules={[{ required: true }]} className="col-span-2">
          <Input placeholder="Mirpur Hub" style={{ borderRadius: 4 }} />
        </Form.Item>
        <Form.Item label="Branch" name="branchId" rules={[{ required: true }]}>
          <Select placeholder="Select branch" style={{ borderRadius: 4 }}>
            {branches.map((b: any) => (
              <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Hub Provider" name="hubProviderId">
          <Select placeholder="Select provider" allowClear style={{ borderRadius: 4 }}>
            {users.map((u: any) => (
              <Select.Option key={u.id} value={u.id}>{u.firstName} {u.lastName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Commission Per Package" name="commissionPerPackage">
          <Input placeholder="5.00" type="number" step="0.01" style={{ borderRadius: 4 }} />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]} className="col-span-2">
          <Input.TextArea rows={2} placeholder="Block D, Mirpur, Dhaka" style={{ borderRadius: 4 }} />
        </Form.Item>
      </div>
      <div className="flex gap-3 mt-2">
        <button type="button" onClick={() => { setCreateModal(false); form.resetFields(); }}
          className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
          Cancel
        </button>
        <button type="submit" disabled={isCreating}
          className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
          {isCreating ? 'Saving...' : 'Save Hub'}
        </button>
      </div>
    </Form>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Hub Directory" searchPlaceholder="Search hub name..." onSearch={setSearch}
        actionLabel="Add Hub" onAction={() => { form.resetFields(); setCreateModal(true); }} />

      {isLoading ? (
        <div className="bg-white p-6 rounded shadow-sm border border-slate-100">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <AppTable columns={columns} data={hubs}
          total={total} pageSize={10} current={page} onPageChange={setPage} loading={isFetching} />
      )}

      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Add New Hub" width={500}>
        <HubForm onFinish={handleCreate} />
      </Modal>
    </div>
  );
};

export default HubsPage;
