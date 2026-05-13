import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Descriptions, Switch, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2, UserPlus, X, User } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { users as initialUsers } from '../data/mockData';
import { User as userType } from '@/types';

const UsersPage: React.FC = () => {
  const [data, setData] = useState<userType[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewUser, setViewUser] = useState<userType | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();

  const filtered = data.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete ${name}?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setData(prev => prev.filter(u => u.id !== id));
        message.success('User deleted successfully');
      },
    });
  };

  const handleCreate = (values: Partial<userType>) => {
    const newUser: userType = {
      id: String(data.length + 1),
      serialNo: `#${12340 + data.length}`,
      name: values.name || '',
      phone: values.phone || '',
      email: values.email || '',
      location: values.location || '',
      avatar: '',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      totalOrders: 0,
      status: 'Active',
    };
    setData(prev => [newUser, ...prev]);
    message.success('User added!');
    setCreateModal(false);
    form.resetFields();
  };

  const columns: ColumnsType<userType> = [
    {
      title: 'S No.', dataIndex: 'serialNo', key: 'serialNo', width: 80,
      render: (v: string) => <span className="text-xs font-mono text-slate-400">{v}</span>,
    },
    {
      title: 'User', key: 'user',
      render: (_: unknown, r: userType) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={r.name} size={36} />
          <div>
            <div className="font-semibold text-sm text-slate-800">{r.name}</div>
            <div className="text-xs text-slate-400">{r.phone}</div>
          </div>
        </div>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { title: 'Location', dataIndex: 'location', key: 'location', render: (v: string) => <span className="text-sm text-slate-500">{v}</span> },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s: userType['status']) => <StatusBadge status={s} />,
    },
    {
      title: 'Action', key: 'action', width: 90,
      render: (_: unknown, r: userType) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewUser(r)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
            <Eye size={15} />
          </button>
          <button onClick={() => handleDelete(r.id, r.name)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="User Management" searchPlaceholder="Search name, email, location..." onSearch={setSearch}
        actionLabel="Add User" onAction={() => setCreateModal(true)} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      {/* View User Modal */}
      <Modal
        open={!!viewUser}
        onCancel={() => setViewUser(null)}
        footer={null}
        title={null}
        centered
        width={550}
        closeIcon={<div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500"><X size={16} /></div>}
      >
        {viewUser && (
          <div className="pt-2">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>User Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Full Name</label>
                <Input value={viewUser.name} readOnly className="bg-slate-50 border-slate-200 rounded-xl h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Email Address</label>
                <Input value={viewUser.email} readOnly className="bg-slate-50 border-slate-200 rounded-xl h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Phone Number</label>
                <Input value={viewUser.phone} readOnly className="bg-slate-50 border-slate-200 rounded-xl h-11" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Logistics ID</label>
                <Input value={viewUser.serialNo.replace('#', 'LID-')} readOnly className="bg-slate-50 border-slate-200 rounded-xl h-11" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-2">Home Address</label>
                <Input.TextArea
                  value={viewUser.location + ", A block, 2 number road house 14."}
                  readOnly
                  rows={3}
                  className="bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-2xl flex items-center justify-between border border-blue-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Privacy Mode</h4>
                <p className="text-xs text-slate-500">Your information will only be visible to authorized representatives</p>
              </div>
              <Switch defaultChecked className="bg-slate-300" />
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                type="primary"
                size="large"
                onClick={() => setViewUser(null)}
                className="w-48 h-12 bg-blue-900 hover:bg-blue-800 border-none font-bold text-sm"
                style={{ borderRadius: 10 }}
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
            <Form.Item label="Full Name" name="name" rules={[{ required: true }]} className="col-span-2">
              <Input placeholder="Ahmed Khan" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="ahmed@email.com" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="+880 123 456 789" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Location" name="location" className="col-span-2">
              <Input placeholder="Dhaka, Bangladesh" style={{ borderRadius: 10 }} />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setCreateModal(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Add User
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
