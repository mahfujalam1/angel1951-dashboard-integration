import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2, UserPlus } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { users as initialUsers } from '../data/mockData';
import type { User } from '../types';

const UsersPage: React.FC = () => {
  const [data, setData] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewUser, setViewUser] = useState<User | null>(null);
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

  const handleCreate = (values: Partial<User>) => {
    const newUser: User = {
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

  const columns: ColumnsType<User> = [
    {
      title: 'S No.', dataIndex: 'serialNo', key: 'serialNo', width: 80,
      render: (v: string) => <span className="text-xs font-mono text-slate-400">{v}</span>,
    },
    {
      title: 'User', key: 'user',
      render: (_: unknown, r: User) => (
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
      render: (s: User['status']) => <StatusBadge status={s} />,
    },
    {
      title: 'Action', key: 'action', width: 90,
      render: (_: unknown, r: User) => (
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
      <Modal open={!!viewUser} onCancel={() => setViewUser(null)} footer={null} title="User Details" width={460}>
        {viewUser && (
          <div className="pt-3">
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
              <Avatar src={viewUser.avatar} name={viewUser.name} size={56} />
              <div>
                <h3 className="font-bold text-lg text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>{viewUser.name}</h3>
                <p className="text-sm text-slate-400">{viewUser.email}</p>
                <StatusBadge status={viewUser.status} className="mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Serial No', value: viewUser.serialNo },
                { label: 'Phone', value: viewUser.phone },
                { label: 'Location', value: viewUser.location },
                { label: 'Joined', value: viewUser.joinDate },
                { label: 'Total Orders', value: viewUser.totalOrders },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                </div>
              ))}
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
