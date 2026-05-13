import React, { useState } from 'react';
import { Modal, Form, Input, Select, message, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, Edit, Trash2, MoreVertical, Power, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import { hubs as initialHubs } from '../data/mockData';
import type { Hub } from '../types';

const HubsPage: React.FC = () => {
  const [data, setData] = useState<Hub[]>(initialHubs);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editHub, setEditHub] = useState<Hub | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const filtered = data.filter(h =>
    h.hubNameId.toLowerCase().includes(search.toLowerCase()) ||
    h.hubLocation.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setData(prev => prev.map(h => h.id === id ? { ...h, status: h.status === 'Active' ? 'Inactive' : 'Active' } : h));
    message.success('Hub status updated!');
  };

  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: 'Delete Hub', content: `Delete hub "${name}"?`, okType: 'danger', okText: 'Delete', cancelText: 'Cancel',
      onOk: () => { setData(prev => prev.filter(h => h.id !== id)); message.success('Hub deleted!'); },
    });
  };

  const handleSaveEdit = (values: Partial<Hub>) => {
    if (!editHub) return;
    setData(prev => prev.map(h => h.id === editHub.id ? { ...h, ...values } : h));
    message.success('Hub updated!');
    setEditHub(null);
  };

  const handleCreate = (values: Partial<Hub>) => {
    const newHub: Hub = {
      id: String(data.length + 1),
      hubNameId: values.hubNameId || '',
      hubLocation: values.hubLocation || '',
      contactNumber: values.contactNumber || '',
      status: 'Active',
      throughput: '0 Rcv / 0 Dep',
      manager: values.manager || '',
      email: values.email || '',
      address: values.address || '',
      openDays: ['Mon','Tue','Wed','Thu','Fri'],
      hours: '09:00 AM - 06:00 PM',
      staffCount: 0,
    };
    setData(prev => [newHub, ...prev]);
    message.success('Hub created!');
    setCreateModal(false);
    form.resetFields();
  };

  const getActions = (r: Hub) => [
    { key: 'view',   label: <span className="flex items-center gap-2"><Eye size={14} /> View Details</span>,    onClick: () => navigate(`/hubs/${r.id}`, { state: { hub: r } }) },
    { key: 'edit',   label: <span className="flex items-center gap-2"><Edit size={14} /> Edit Hub</span>,       onClick: () => { setEditHub(r); form.setFieldsValue(r); } },
    { key: 'toggle', label: <span className="flex items-center gap-2"><Power size={14} /> {r.status === 'Active' ? 'Deactivate' : 'Activate'}</span>, onClick: () => toggleStatus(r.id) },
    { type: 'divider' as const },
    { key: 'delete', label: <span className="flex items-center gap-2 text-red-500"><Trash2 size={14} /> Delete Hub</span>, onClick: () => handleDelete(r.id, r.hubNameId), danger: true },
  ];

  const columns: ColumnsType<Hub> = [
    { title: 'ID', key: 'id', width: 75, render: () => <span className="text-xs font-mono text-slate-400">#12333</span> },
    { title: 'Hub Name', dataIndex: 'hubNameId', key: 'hubNameId', render: (v: string) => <span className="font-semibold text-sm text-slate-800">{v}</span> },
    {
      title: 'Location', dataIndex: 'hubLocation', key: 'hubLocation',
      render: (v: string) => (
        <div className="flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin size={12} className="text-slate-400" /> {v}
        </div>
      ),
    },
    { title: 'Contact', dataIndex: 'contactNumber', key: 'contactNumber', render: (v: string) => <span className="text-sm font-mono text-slate-600">{v}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: Hub['status']) => <StatusBadge status={s} /> },
    { title: "Throughput", dataIndex: 'throughput', key: 'throughput', render: (v: string) => <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">{v}</span> },
    {
      title: 'Actions', key: 'actions', fixed: 'right' as const, width: 90,
      render: (_: unknown, r: Hub) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/hubs/${r.id}`, { state: { hub: r } })}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
            <Eye size={15} />
          </button>
          <Dropdown menu={{ items: getActions(r) }} trigger={['click']} placement="bottomRight">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
              <MoreVertical size={15} />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  const HubForm = ({ onFinish }: { onFinish: (v: Partial<Hub>) => void }) => (
    <Form form={form} layout="vertical" onFinish={onFinish} className="pt-3">
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item label="Hub Name" name="hubNameId" rules={[{ required: true }]}>
          <Input placeholder="Dubai Hub" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Location" name="hubLocation" rules={[{ required: true }]}>
          <Input placeholder="Kerala, India" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Contact Number" name="contactNumber">
          <Input placeholder="+1 (470) 918 8533" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Manager Name" name="manager">
          <Input placeholder="John Lim" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Email" name="email" className="col-span-2">
          <Input placeholder="hub@Buan Logistics.com" style={{ borderRadius: 10 }} />
        </Form.Item>
        <Form.Item label="Address" name="address" className="col-span-2">
          <Input placeholder="Full address" style={{ borderRadius: 10 }} />
        </Form.Item>
      </div>
      <div className="flex gap-3 mt-2">
        <button type="button" onClick={() => { setCreateModal(false); setEditHub(null); form.resetFields(); }}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Save Hub
        </button>
      </div>
    </Form>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Hub Directory" searchPlaceholder="Search hub name, location..." onSearch={setSearch}
        actionLabel="Add Hub" onAction={() => { form.resetFields(); setCreateModal(true); }} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Add New Hub" width={500}>
        <HubForm onFinish={handleCreate} />
      </Modal>
      <Modal open={!!editHub} onCancel={() => { setEditHub(null); form.resetFields(); }} footer={null} title="Edit Hub" width={500}>
        <HubForm onFinish={handleSaveEdit} />
      </Modal>
    </div>
  );
};

export default HubsPage;
