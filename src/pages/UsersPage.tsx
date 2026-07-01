import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Switch, Button, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2, X, User } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { useGetUsersQuery, useCreateUserMutation } from '../redux/api/usersApi';

const UsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewUser, setViewUser] = useState<any | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();

  const { data: response, isLoading, isFetching } = useGetUsersQuery({ page, limit: 10, search });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const rawData = response?.data?.users || response?.data?.data || response?.data?.results || response?.data;
  const users = Array.isArray(rawData) ? rawData : [];
  const total = response?.data?.pagination?.totalItems || response?.data?.total || users.length || 0;

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete ${name}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        message.warning('Delete API not implemented yet');
      },
    });
  };

  const handleCreate = async (values: any) => {
    try {
      await createUser({ ...values, provider: 'local' }).unwrap();
      message.success('User added!');
      setCreateModal(false);
      form.resetFields();
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to create user');
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ID', dataIndex: 'id', key: 'id', width: 80,
      render: (v: string) => <span className="text-xs font-mono text-slate-400">#{v?.substring(0, 5)}</span>,
    },
    {
      title: 'User', key: 'user',
      render: (_: unknown, r: any) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={`${r.firstName} ${r.lastName}`} size={36} />
          <div>
            <div className="font-semibold text-sm text-slate-800">{r.firstName} {r.lastName}</div>
            <div className="text-xs text-slate-400">{r.role || 'User'}</div>
          </div>
        </div>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (v: string) => <span className="text-sm text-slate-500">{v || 'N/A'}</span> },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s: string) => <StatusBadge status={s || 'Active'} />,
    },
    {
      title: 'Action', key: 'action', width: 90,
      render: (_: unknown, r: any) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewUser(r)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer">
            <Eye size={15} />
          </button>
          <button onClick={() => handleDelete(r.id, `${r.firstName} ${r.lastName}`)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="User Management" searchPlaceholder="Search name, email..." onSearch={setSearch}
        actionLabel="Add User" onAction={() => setCreateModal(true)} />

      {isLoading ? (
        <div className="bg-white p-6 rounded shadow-sm border border-slate-100">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <AppTable columns={columns} data={users}
          total={total} pageSize={10} current={page} onPageChange={setPage} loading={isFetching} />
      )}

      {/* View User Modal */}
      <Modal
        open={!!viewUser}
        onCancel={() => setViewUser(null)}
        footer={null}
        title={null}
        centered
        width={550}
        closeIcon={<div className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 transition-all text-slate-500 cursor-pointer"><X size={16} /></div>}
      >
        {viewUser && (
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>User Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">First Name</label>
                <Input value={viewUser.firstName} readOnly className="bg-slate-50 border-slate-200 rounded h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Last Name</label>
                <Input value={viewUser.lastName} readOnly className="bg-slate-50 border-slate-200 rounded h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Email Address</label>
                <Input value={viewUser.email} readOnly className="bg-slate-50 border-slate-200 rounded h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Role</label>
                <Input value={viewUser.role} readOnly className="bg-slate-50 border-slate-200 rounded h-11" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-2">ID</label>
                <Input
                  value={viewUser.id}
                  readOnly
                  className="bg-slate-50 border-slate-200 rounded"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                type="primary"
                size="large"
                onClick={() => setViewUser(null)}
                className="w-48 h-12 bg-blue-900 hover:bg-blue-800 border-none font-bold text-sm cursor-pointer"
                style={{ borderRadius: 4 }}
              >
                Ok
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create User Modal */}
      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Add New User" width={460}>
        <Form form={form} layout="vertical" onFinish={handleCreate} className="pt-3">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input placeholder="John" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input placeholder="Doe" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]} className="col-span-2">
              <Input placeholder="user@example.com" style={{ borderRadius: 4 }} />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]} className="col-span-2">
              <Input.Password placeholder="Password123!" style={{ borderRadius: 4 }} />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setCreateModal(false)}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isCreating}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
              {isCreating ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;

