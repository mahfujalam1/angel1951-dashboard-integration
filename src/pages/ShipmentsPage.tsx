import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Modal, Select, message, Form, Input, Skeleton, DatePicker, Upload as AntUpload, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowRight, MoreVertical, Building2, UserCheck, RefreshCw, MessageSquare, Upload, Eye, Package } from 'lucide-react';
import { UploadOutlined } from '@ant-design/icons';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatusBadge from '../components/ui/StatusBadge';
import { 
  useGetAdminShipmentsQuery, 
  useUpdateShipmentStatusMutation,
  useCreateT1ShipmentMutation,
  useCreateT2T3ShipmentMutation,
  useCreateCorporateShipmentMutation
} from '../redux/api/shipmentsApi';
import { useGetHubsQuery, useGetBranchesQuery } from '../redux/api/branchesApi';
import { useGetUsersQuery } from '../redux/api/usersApi';

const statusOptions = ['PENDING', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'AT_HUB', 'PICKED_UP', 'CANCELLED'];

const ShipmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [detailItem, setDetailItem] = useState<any>(null);
  const [statusModal, setStatusModal] = useState<any>(null);
  const [createModal, setCreateModal] = useState(false);
  const [shipmentType, setShipmentType] = useState('T1');
  const [newStatus, setNewStatus] = useState<string>('IN_TRANSIT');
  const [statusNotes, setStatusNotes] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();

  // API Queries
  const { data: response, isLoading, isFetching } = useGetAdminShipmentsQuery({ page, limit: 10, search });
  const rawData = response?.data?.data || response?.data?.results || response?.data;
  const shipments = Array.isArray(rawData) ? rawData : [];
  const total = response?.data?.pagination?.totalItems || response?.data?.total || shipments.length || 0;

  const { data: hubsRes } = useGetHubsQuery({ limit: 100 });
  const hubs = Array.isArray(hubsRes?.data?.hubs) ? hubsRes.data.hubs : [];

  const { data: branchesRes } = useGetBranchesQuery({ limit: 100 });
  const branches = Array.isArray(branchesRes?.data?.branches) ? branchesRes.data.branches : [];

  const { data: usersRes } = useGetUsersQuery({ limit: 100 });
  const users = Array.isArray(usersRes?.data?.users) ? usersRes.data.users : [];

  // API Mutations
  const [updateStatus, { isLoading: isUpdating }] = useUpdateShipmentStatusMutation();
  const [createT1, { isLoading: isCreatingT1 }] = useCreateT1ShipmentMutation();
  const [createT2T3, { isLoading: isCreatingT2T3 }] = useCreateT2T3ShipmentMutation();
  const [createCorporate, { isLoading: isCreatingCorp }] = useCreateCorporateShipmentMutation();

  const handleUpdateStatus = async () => {
    if (!statusModal) return;
    try {
      const files = fileList.map(f => f.originFileObj).filter(Boolean);
      await updateStatus({ 
        id: statusModal.id, 
        status: newStatus, 
        notes: statusNotes,
        files: files.length > 0 ? files : undefined
      }).unwrap();
      message.success('Status updated successfully!');
      setStatusModal(null);
      setStatusNotes('');
      setFileList([]);
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to update status');
    }
  };

  const handleCreate = async (values: any) => {
    try {
      if (shipmentType === 'T1') {
        await createT1({
          ...values,
          weight: parseFloat(values.weight),
          scheduledPickupDate: values.scheduledPickupDate?.toISOString()
        }).unwrap();
      } else if (shipmentType === 'T2_T3') {
        await createT2T3({
          ...values,
          weight: parseFloat(values.weight),
          cost: parseFloat(values.cost),
          scheduledPickupDate: values.scheduledPickupDate?.toISOString(),
          packageDetails: {
            width: parseFloat(values.width || 0),
            height: parseFloat(values.height || 0),
            depth: parseFloat(values.depth || 0)
          },
          containerDetails: values.containerId ? {
            containerId: values.containerId,
            size: values.containerSize || '20ft'
          } : undefined
        }).unwrap();
      } else if (shipmentType === 'CORPORATE') {
        await createCorporate({
          ...values,
          weight: parseFloat(values.weight),
          packageDetails: {
            packagesCount: parseInt(values.packagesCount || 1, 10)
          }
        }).unwrap();
      }
      message.success('Shipment created successfully!');
      setCreateModal(false);
      form.resetFields();
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to create shipment');
    }
  };

  const getActions = (record: any) => [
    { key: 'status', label: <span className="flex items-center gap-2"><RefreshCw size={14} /> Update Status</span>, onClick: () => { setNewStatus(record.status || 'IN_TRANSIT'); setStatusModal(record); } },
    { type: 'divider' as const },
    { key: 'hub',    label: <span className="flex items-center gap-2 text-slate-400"><Building2 size={14} /> Assign Hub (N/A)</span>, disabled: true },
    { key: 'staff',  label: <span className="flex items-center gap-2 text-slate-400"><UserCheck size={14} /> Assign Staff (N/A)</span>, disabled: true },
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Tracking ID', dataIndex: 'trackingNumber', key: 'trackingNumber',
      render: (v: string) => <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">{v || 'N/A'}</span>,
    },
    {
      title: 'Customer/Sender', key: 'sender',
      render: (_: unknown, r: any) => (
        <span className="text-sm font-semibold text-slate-700">
          {r.senderUser ? `${r.senderUser.firstName} ${r.senderUser.lastName}` : (r.senderFirstName ? `${r.senderFirstName} ${r.senderLastName}` : 'Unknown')}
        </span>
      ),
    },
    { 
      title: 'Receiver', key: 'receiver', 
      render: (_: unknown, r: any) => (
        <div>
          <span className="text-sm text-slate-600 block">{r.receiverName}</span>
          <span className="text-xs text-slate-400">{r.receiverAddress}</span>
        </div>
      ) 
    },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (v: string) => <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded">{v || 'STANDARD'}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s || 'PENDING'} /> },
    {
      title: 'Action', key: 'action', fixed: 'right' as const, width: 100,
      render: (_: unknown, r: any) => (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate(`/shipments/${r.id || r.trackingNumber}`)}
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

  return (
    <div className="space-y-5">
      <PageHeader title="Shipment Management" searchPlaceholder="Search tracking ID, customer..." onSearch={setSearch}
        actionLabel="Create Shipment" onAction={() => setCreateModal(true)} />

      {isLoading ? (
        <div className="bg-white p-6 rounded shadow-sm border border-slate-100">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <AppTable columns={columns} data={shipments}
          total={total} pageSize={10} current={page} onPageChange={setPage} loading={isFetching} />
      )}

      {/* Update Status Modal */}
      <Modal open={!!statusModal} onCancel={() => { setStatusModal(null); setFileList([]); setStatusNotes(''); }}
        title="Update Shipment Status" footer={[
          <Button key="cancel" onClick={() => setStatusModal(null)}>Cancel</Button>,
          <Button key="submit" type="primary" loading={isUpdating} onClick={handleUpdateStatus} className="bg-blue-600">Update Status</Button>
        ]}>
        <div className="py-3 space-y-4">
          <p className="text-sm text-slate-500 mb-2">Tracking: <strong>{statusModal?.trackingNumber}</strong></p>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
            <Select value={newStatus} onChange={v => setNewStatus(v)} style={{ width: '100%', borderRadius: 4 }} size="large"
              options={statusOptions.map(s => ({ value: s, label: s.replace(/_/g, ' ') }))} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Notes</label>
            <Input.TextArea rows={3} value={statusNotes} onChange={(e) => setStatusNotes(e.target.value)} placeholder="Add internal notes..." style={{ borderRadius: 4 }} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Attach Photos</label>
            <AntUpload
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </AntUpload>
          </div>
        </div>
      </Modal>

      {/* Create Shipment Modal */}
      <Modal open={createModal} onCancel={() => setCreateModal(false)} footer={null} title="Create New Shipment" width={700}>
        <div className="mb-4 pt-3 border-b border-slate-100 pb-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Customer Type</label>
          <div className="flex gap-3">
            {[
              { id: 'T1', label: 'Regular Customer (T1)' },
              { id: 'T2_T3', label: 'Premium (T2/T3)' },
              { id: 'CORPORATE', label: 'Corporate Partner' }
            ].map(type => (
              <button key={type.id} onClick={() => { setShipmentType(type.id); form.resetFields(); }}
                className={`px-4 py-2 text-sm font-semibold rounded border transition-colors cursor-pointer ${shipmentType === type.id ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <div className="grid grid-cols-2 gap-x-4">
            
            {/* COMMON RECEIVER FIELDS */}
            <div className="col-span-2"><h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1">Receiver Info</h4></div>
            <Form.Item label="Receiver Name" name="receiverName" rules={[{ required: true }]}><Input style={{ borderRadius: 4 }} /></Form.Item>
            <Form.Item label="Receiver Phone" name="receiverPhone" rules={[{ required: true }]}><Input style={{ borderRadius: 4 }} /></Form.Item>
            <Form.Item label="Receiver Address" name="receiverAddress" rules={[{ required: true }]} className="col-span-2"><Input.TextArea rows={2} style={{ borderRadius: 4 }} /></Form.Item>
            <Form.Item label="Weight (kg)" name="weight" rules={[{ required: true }]}><Input type="number" step="0.1" style={{ borderRadius: 4 }} /></Form.Item>
            
            {/* T1 SPECIFIC */}
            {shipmentType === 'T1' && (
              <>
                <div className="col-span-2"><h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1 mt-2">Sender Info (T1)</h4></div>
                <Form.Item label="First Name" name="senderFirstName" rules={[{ required: true }]}><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Last Name" name="senderLastName" rules={[{ required: true }]}><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Phone" name="senderPhone" rules={[{ required: true }]}><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Email" name="senderEmail"><Input type="email" style={{ borderRadius: 4 }} /></Form.Item>
                
                <div className="col-span-2"><h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1 mt-2">Pickup & Hub</h4></div>
                <Form.Item label="Hub" name="hubId" rules={[{ required: true }]}>
                  <Select placeholder="Select Hub">
                    {hubs.map((h: any) => <Select.Option key={h.id} value={h.id}>{h.name}</Select.Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Pickup Date" name="scheduledPickupDate"><DatePicker style={{ width: '100%', borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Contact Name" name="pickupContactName"><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Contact Phone" name="pickupContactPhone"><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Pickup Address" name="pickupAddress" className="col-span-2"><Input.TextArea rows={2} style={{ borderRadius: 4 }} /></Form.Item>
              </>
            )}

            {/* T2/T3 & CORPORATE SPECIFIC */}
            {(shipmentType === 'T2_T3' || shipmentType === 'CORPORATE') && (
              <>
                <div className="col-span-2"><h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1 mt-2">Account & Branch</h4></div>
                <Form.Item label="Sender User" name="senderId" rules={[{ required: true }]}>
                  <Select showSearch placeholder="Search user" optionFilterProp="children">
                    {users.map((u: any) => <Select.Option key={u.id} value={u.id}>{u.firstName} {u.lastName} ({u.email})</Select.Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="Branch" name="branchId" rules={[{ required: true }]}>
                  <Select placeholder="Select Branch">
                    {branches.map((b: any) => <Select.Option key={b.id} value={b.id}>{b.name}</Select.Option>)}
                  </Select>
                </Form.Item>
                
                <Form.Item label="Description" name="description" className="col-span-2"><Input.TextArea rows={2} style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Shipment Type" name="type" initialValue="STANDARD"><Select><Select.Option value="STANDARD">STANDARD</Select.Option><Select.Option value="EXPRESS">EXPRESS</Select.Option></Select></Form.Item>
              </>
            )}

            {/* T2/T3 ONLY */}
            {shipmentType === 'T2_T3' && (
              <>
                <Form.Item label="Cost" name="cost"><Input type="number" style={{ borderRadius: 4 }} /></Form.Item>
                <div className="col-span-2"><h4 className="text-sm font-bold text-slate-800 mb-3 border-b pb-1 mt-2">Dimensions (Optional)</h4></div>
                <Form.Item label="Width" name="width"><Input type="number" style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Height" name="height"><Input type="number" style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Depth" name="depth"><Input type="number" style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Pickup Date" name="scheduledPickupDate"><DatePicker style={{ width: '100%', borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Container ID" name="containerId"><Input style={{ borderRadius: 4 }} /></Form.Item>
                <Form.Item label="Container Size" name="containerSize"><Input placeholder="20ft" style={{ borderRadius: 4 }} /></Form.Item>
              </>
            )}

            {/* CORPORATE ONLY */}
            {shipmentType === 'CORPORATE' && (
              <>
                <Form.Item label="Packages Count" name="packagesCount" initialValue={1}><Input type="number" min={1} style={{ borderRadius: 4 }} /></Form.Item>
              </>
            )}

          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setCreateModal(false)}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={isCreatingT1 || isCreatingT2T3 || isCreatingCorp}
              className="flex-1 py-2.5 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50">
              {isCreatingT1 || isCreatingT2T3 || isCreatingCorp ? 'Creating...' : 'Create Shipment'}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ShipmentsPage;
