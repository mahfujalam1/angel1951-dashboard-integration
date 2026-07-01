import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Button, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2, X, Building2, MapPin } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import { useGetBranchesQuery, useCreateBranchMutation } from '../redux/api/branchesApi';
import { useNavigate } from 'react-router-dom';

const BranchesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: response, isLoading, isFetching } = useGetBranchesQuery({ page, limit: 10, search });
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation();

  const rawData = response?.data?.branches || response?.data?.data || response?.data?.results || response?.data;
  const branches = Array.isArray(rawData) ? rawData : [];
  const total = response?.data?.pagination?.totalItems || response?.data?.total || branches.length || 0;

  const handleCreate = async (values: any) => {
    try {
      await createBranch({
        ...values,
        latitude: parseFloat(values.latitude) || 0,
        longitude: parseFloat(values.longitude) || 0,
      }).unwrap();
      message.success('Branch added!');
      setCreateModal(false);
      form.resetFields();
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to create branch');
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ID', dataIndex: 'id', key: 'id', width: 80,
      render: (v: string) => <span className="text-xs font-mono text-slate-400">#{v?.substring(0, 5)}</span>,
    },
    {
      title: 'Branch Name', dataIndex: 'name', key: 'name',
      render: (v: string) => (
        <div className="flex items-center gap-2 font-semibold text-sm text-slate-800">
          <Building2 size={16} className="text-blue-500" />
          {v}
        </div>
      ),
    },
    {
      title: 'City', dataIndex: 'city', key: 'city',
      render: (v: string) => <span className="text-sm text-slate-600">{v}</span>
    },
    {
      title: 'Address', dataIndex: 'address', key: 'address',
      render: (v: string) => (
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={12} className="text-slate-400" /> {v}
        </div>
      )
    },
    {
      title: 'Action', key: 'action', width: 90,
      render: (_: unknown, r: any) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => navigate(`/branches/${r.id}`)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
            <Eye size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Branch Directory" searchPlaceholder="Search branch name, city..." onSearch={setSearch}
        actionLabel="Add Branch" onAction={() => setCreateModal(true)} />

      {isLoading ? (
        <div className="bg-white p-6 rounded shadow-sm border border-slate-100">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <AppTable columns={columns} data={branches}
          total={total} pageSize={10} current={page} onPageChange={setPage} loading={isFetching} />
      )}

      {/* Create Branch Modal */}
      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Add New Branch" width={460}>
        <Form form={form} layout="vertical" onFinish={handleCreate} className="pt-3">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item label="Branch Name" name="name" rules={[{ required: true }]} className="col-span-2">
              <Input placeholder="Dhaka Branch" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true }]} className="col-span-2">
              <Input placeholder="Dhaka" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]} className="col-span-2">
              <Input.TextArea rows={2} placeholder="123 Main St, Dhaka" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Latitude" name="latitude">
              <Input placeholder="23.8103" type="number" step="any" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Longitude" name="longitude">
              <Input placeholder="90.4125" type="number" step="any" style={{ borderRadius: 4 }} />
            </Form.Item>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="button" onClick={() => setCreateModal(false)}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isCreating}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
              {isCreating ? 'Adding...' : 'Add Branch'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default BranchesPage;
