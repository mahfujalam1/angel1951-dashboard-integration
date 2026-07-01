import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Input, Select, message, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Trash2, MoreVertical, Power, Edit } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { staffList as initialStaff } from '../data/mockData';
import type { Staff } from '../types';
import { Users, UserCheck, Clock, UserX } from 'lucide-react';

const roles = ['Delivery', 'Manager', 'Warehouse', 'Support'];
const hubs = ['Dubai Hub', 'London Hub', 'NY Hub', 'Singapore Hub', 'Tokyo Hub', 'Sydney Hub'];

const StaffPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Staff[]>(initialStaff);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editStaff, setEditStaff] = useState<Staff | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();

  const filtered = data.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter ? s.role === roleFilter : true) &&
    (statusFilter ? s.status === statusFilter : true)
  );

  const stats = {
    total: data.length,
    active: data.filter(s => s.status === 'Active').length,
    busy: data.filter(s => s.status === 'Busy').length,
    inactive: data.filter(s => s.status === 'Inactive').length,
  };

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: 'Remove Staff', content: `Remove ${name} from staff?`, okType: 'danger', okText: 'Remove',
      onOk: () => { setData(prev => prev.filter(s => s.id !== id)); message.success('Staff removed!'); },
    });
  };

  const toggleStatus = (id: string) => {
    setData(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    message.success('Status updated!');
  };

  const handleSave = (values: Partial<Staff>) => {
    if (editStaff) {
      setData(prev => prev.map(s => s.id === editStaff.id ? { ...s, ...values } : s));
      message.success('Staff updated!');
      setEditStaff(null);
    } else {
      setData(prev => [{
        id: String(data.length + 1), name: values.name || '', role: values.role || 'Delivery',
        hub: values.hub || 'Dubai Hub', status: 'Active', contact: values.contact || '',
        avatar: '', email: values.email || '', joinDate: new Date().toLocaleDateString(), deliveries: 0,
      }, ...prev]);
      message.success('Staff added!');
      setCreateModal(false);
    }
    form.resetFields();
  };

  const getActions = (r: Staff) => [
    { key: 'view',   label: <span className="flex items-center gap-2"><Eye size={14} /> View Details</span>,    onClick: () => navigate(`/staff/${r.id}`, { state: { staff: r } }) },
    { key: 'edit',   label: <span className="flex items-center gap-2"><Edit size={14} /> Edit</span>,            onClick: () => { setEditStaff(r); form.setFieldsValue(r); } },
    { key: 'toggle', label: <span className="flex items-center gap-2"><Power size={14} /> {r.status === 'Active' ? 'Deactivate' : 'Activate'}</span>, onClick: () => toggleStatus(r.id) },
    { type: 'divider' as const },
    { key: 'delete', label: <span className="flex items-center gap-2 text-red-500"><Trash2 size={14} /> Remove</span>, onClick: () => handleDelete(r.id, r.name), danger: true },
  ];

  const columns: ColumnsType<Staff> = [
    { title: '#', key: 'idx', width: 48, render: (_: unknown, __: Staff, i: number) => <span className="text-slate-400 text-sm font-medium">{(page - 1) * 10 + i + 1}</span> },
    {
      title: 'Staff Name', key: 'name',
      render: (_: unknown, r: Staff) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={r.name} size={36} />
          <div>
            <div className="font-semibold text-sm text-slate-800">{r.name}</div>
            <div className="text-xs text-slate-400">{r.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role', dataIndex: 'role', key: 'role',
      render: (v: string) => <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">{v}</span>,
    },
    { title: 'Hub', dataIndex: 'hub', key: 'hub', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: Staff['status']) => <StatusBadge status={s} /> },
    { title: 'Contact', dataIndex: 'contact', key: 'contact', render: (v: string) => <span className="text-sm font-mono text-slate-500">{v}</span> },
    {
      title: '', key: 'action', width: 80,
      render: (_: unknown, r: Staff) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/staff/${r.id}`, { state: { staff: r } })}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
            <Eye size={15} />
          </button>
          <Dropdown menu={{ items: getActions(r) }} trigger={['click']} placement="bottomRight">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 transition-colors">
              <MoreVertical size={15} />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const StaffForm = ({ onFinish }: { onFinish: (v: Partial<Staff>) => void }) => (
    <Form form={form} layout="vertical" onFinish={onFinish} className="pt-3">
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item label="Full Name" name="name" rules={[{ required: true }]} className="col-span-2">
          <Input placeholder="Ahmed Khan" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="ahmed@Buan Logistics.com" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Contact" name="contact">
          <Input placeholder="+34594 65 6418" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select options={roles.map(r => ({ value: r, label: r }))} placeholder="Select role" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Hub" name="hub">
          <Select options={hubs.map(h => ({ value: h, label: h }))} placeholder="Select hub" style={{ borderRadius: 10 }} />
        </Form.Item>
      </div>
      <div className="flex gap-3 mt-2">
        <button type="button" onClick={() => { setCreateModal(false); setEditStaff(null); form.resetFields(); }}
          className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
        <button type="submit"
          className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save</button>
      </div>
    </Form>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Staff" value={stats.total} icon={<Users size={17} />} color="#2563eb" />
        <StatCard label="Active" value={stats.active} icon={<UserCheck size={17} />} color="#059669" />
        <StatCard label="Busy" value={stats.busy} icon={<Clock size={17} />} color="#d97706" />
        <StatCard label="Inactive" value={stats.inactive} icon={<UserX size={17} />} color="#dc2626" />
      </div>

      <PageHeader title="Staff Management" searchPlaceholder="Search staff..." onSearch={setSearch}
        actionLabel="Add Staff" onAction={() => { form.resetFields(); setCreateModal(true); }}
        extra={
          <div className="flex gap-2">
            <Select placeholder="Role" style={{ width: 110 }} allowClear onChange={setRoleFilter}
              options={roles.map(r => ({ value: r, label: r }))} />
            <Select placeholder="Status" style={{ width: 120 }} allowClear onChange={setStatusFilter}
              options={[{ value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }, { value: 'Busy', label: 'Busy' }]} />
          </div>
        }
      />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />


      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Add New Staff" width={460}>
        <StaffForm onFinish={handleSave} />
      </Modal>
      <Modal open={!!editStaff} onCancel={() => { setEditStaff(null); form.resetFields(); }} footer={null} title="Edit Staff" width={460}>
        <StaffForm onFinish={handleSave} />
      </Modal>
    </div>
  );
};

export default StaffPage;
