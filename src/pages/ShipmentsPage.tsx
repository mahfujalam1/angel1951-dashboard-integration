import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Modal, Select, message, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowRight, MoreVertical, Building2, UserCheck, RefreshCw, MessageSquare, Upload, Eye } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import { shipments as initialShipments } from '../data/mockData';
import type { Shipment, ShipmentStatus } from '../types';

const statusOptions: ShipmentStatus[] = ['In Transit', 'Custom Processing', 'Out of Delivery', 'Delivered', 'At Hub', 'Picked'];

const ShipmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Shipment[]>(initialShipments);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [detailItem, setDetailItem] = useState<Shipment | null>(null);
  const [statusModal, setStatusModal] = useState<Shipment | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [form] = Form.useForm();

  const filtered = data.filter(s =>
    s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
    s.customer.toLowerCase().includes(search.toLowerCase()) ||
    s.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateStatus = () => {
    if (!statusModal) return;
    setData(prev => prev.map(s => s.id === statusModal.id ? { ...s, status: newStatus } : s));
    message.success('Status updated successfully!');
    setStatusModal(null);
  };

  const handleCreate = (values: Record<string, string>) => {
    const newShipment: Shipment = {
      id: String(data.length + 1),
      trackingId: `1.8NI${Math.floor(Math.random() * 90000 + 10000)}`,
      from: values.from, to: values.to, customer: values.customer,
      status: 'Picked', assignedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      weight: values.weight || '1.0 kg', hub: values.hub || 'Dubai Hub', staff: values.staff || 'Unassigned',
    };
    setData(prev => [newShipment, ...prev]);
    message.success('Shipment created!');
    setCreateModal(false);
    form.resetFields();
  };

  const getActions = (record: Shipment) => [
    { key: 'hub',    label: <span className="flex items-center gap-2"><Building2 size={14} /> Assign Hub</span>,    onClick: () => message.info(`Assign hub for ${record.trackingId}`) },
    { key: 'staff',  label: <span className="flex items-center gap-2"><UserCheck size={14} /> Assign Staff</span>,  onClick: () => message.info(`Assign staff for ${record.trackingId}`) },
    { key: 'status', label: <span className="flex items-center gap-2"><RefreshCw size={14} /> Update Status</span>, onClick: () => { setNewStatus(record.status); setStatusModal(record); } },
    { key: 'notes',  label: <span className="flex items-center gap-2"><MessageSquare size={14} /> Add Notes</span>,  onClick: () => message.info(`Add notes for ${record.trackingId}`) },
    { type: 'divider' as const },
    { key: 'upload', label: <span className="flex items-center gap-2"><Upload size={14} /> Upload Docs</span>,      onClick: () => message.info(`Upload for ${record.trackingId}`) },
  ];

  const columns: ColumnsType<Shipment> = [
    {
      title: 'Tracking ID', dataIndex: 'trackingId', key: 'trackingId',
      render: (v: string) => <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg">{v}</span>,
    },
    {
      title: 'Route', key: 'route',
      render: (_: unknown, r: Shipment) => (
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 whitespace-nowrap">
          {r.from} <ArrowRight size={12} className="text-slate-400 flex-shrink-0" /> {r.to}
        </div>
      ),
    },
    { title: 'Customer', dataIndex: 'customer', key: 'customer', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: ShipmentStatus) => <StatusBadge status={s} /> },
    { title: 'Date', dataIndex: 'assignedDate', key: 'assignedDate', render: (v: string) => <span className="text-xs text-slate-400">{v}</span> },
    {
      title: 'Action', key: 'action', fixed: 'right' as const, width: 100,
      render: (_: unknown, r: Shipment) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/shipments/${r.id}`)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
            <Eye size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Shipment Management" searchPlaceholder="Search tracking ID, customer..." onSearch={setSearch}
        actionLabel="Create Shipment" onAction={() => setCreateModal(true)} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      {/* Detail Modal */}
      <Modal open={!!detailItem} onCancel={() => setDetailItem(null)} footer={null} title="Shipment Details" width={480}>
        {detailItem && (
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{detailItem.trackingId}</span>
              <StatusBadge status={detailItem.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'From', value: detailItem.from },
                { label: 'To', value: detailItem.to },
                { label: 'Customer', value: detailItem.customer },
                { label: 'Weight', value: detailItem.weight },
                { label: 'Assigned Hub', value: detailItem.hub },
                { label: 'Staff', value: detailItem.staff },
                { label: 'Date', value: detailItem.assignedDate },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setDetailItem(null); setNewStatus(detailItem.status); setStatusModal(detailItem); }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors mt-2">
              Update Status
            </button>
          </div>
        )}
      </Modal>

      {/* Update Status Modal */}
      <Modal open={!!statusModal} onCancel={() => setStatusModal(null)}
        title="Update Shipment Status" onOk={handleUpdateStatus} okText="Update" okButtonProps={{ style: { background: '#2563eb', borderRadius: 8 } }}>
        <div className="py-3">
          <p className="text-sm text-slate-500 mb-3">Tracking: <strong>{statusModal?.trackingId}</strong></p>
          <Select value={newStatus} onChange={v => setNewStatus(v)} style={{ width: '100%', borderRadius: 10 }} size="large"
            options={statusOptions.map(s => ({ value: s, label: s }))} />
        </div>
      </Modal>

      {/* Create Shipment Modal */}
      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Create New Shipment" width={500}>
        <Form form={form} layout="vertical" onFinish={handleCreate} className="pt-3">
          <div className="grid grid-cols-2 gap-x-4">
            <Form.Item label="Customer Name" name="customer" rules={[{ required: true }]}>
              <Input placeholder="Ahmed Khan" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Weight" name="weight">
              <Input placeholder="2.5 kg" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="From" name="from" rules={[{ required: true }]}>
              <Input placeholder="Bangladesh" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="To" name="to" rules={[{ required: true }]}>
              <Input placeholder="United States" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Assigned Hub" name="hub">
              <Input placeholder="Dubai Hub" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Form.Item label="Staff" name="staff">
              <Input placeholder="Rashid Ali" style={{ borderRadius: 10 }} />
            </Form.Item>
          </div>
          <div className="flex gap-3 mt-2">
            <button type="button" onClick={() => setCreateModal(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Create Shipment
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ShipmentsPage;
