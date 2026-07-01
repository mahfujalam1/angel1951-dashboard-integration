import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Upload,
  Building2,
  UserCheck,
  Plus,
  FileText,
  CreditCard
} from 'lucide-react';
import { message, Skeleton, Modal, Input, Upload as AntUpload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Card from '../components/ui/Card';
import { useTrackShipmentQuery, useUpdateShipmentStatusMutation } from '../redux/api/shipmentsApi';

const ShipmentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isUploadDocsModalOpen, setIsUploadDocsModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);

  const { data: response, isLoading } = useTrackShipmentQuery(id as string, { skip: !id });
  const shipment = response?.data?.data || response?.data || null;

  const [updateStatus, { isLoading: isUpdating }] = useUpdateShipmentStatusMutation();

  const handleAddNote = async () => {
    if (!shipment || !note) return;
    try {
      await updateStatus({ id: shipment.id, status: shipment.status, notes: note }).unwrap();
      message.success('Note added successfully');
      setIsAddNoteModalOpen(false);
      setNote('');
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to add note');
    }
  };

  const handleUploadDocs = async () => {
    if (!shipment || fileList.length === 0) return;
    try {
      const files = fileList.map(f => f.originFileObj).filter(Boolean);
      await updateStatus({ id: shipment.id, status: shipment.status, files }).unwrap();
      message.success('Documents uploaded successfully');
      setIsUploadDocsModalOpen(false);
      setFileList([]);
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to upload documents');
    }
  };

  if (isLoading) {
    return <div className="p-5 space-y-6"><Skeleton active paragraph={{ rows: 10 }} /></div>;
  }

  if (!shipment) {
    return (
      <div className="p-5 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-bold text-slate-800">Shipment Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
              Shipment Details: <span className="text-blue-600">#{shipment.trackingNumber || shipment.id}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">Type: {shipment.type || 'STANDARD'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-blue-600 rounded p-6 text-white shadow-md shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-3 inline-block">Current Status</span>
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{shipment.status?.replace(/_/g, ' ') || 'PENDING'}</h2>
              <p className="text-blue-100 text-sm">Last Update: {new Date(shipment.updatedAt).toLocaleString()}</p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded flex items-center justify-center">
              <Truck size={32} />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Sender Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</label>
                  <p className="text-sm font-bold text-slate-700">
                    {shipment.senderUser ? `${shipment.senderUser.firstName} ${shipment.senderUser.lastName}` : (shipment.senderFirstName ? `${shipment.senderFirstName} ${shipment.senderLastName}` : 'N/A')}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contact</label>
                  <p className="text-sm font-semibold text-slate-600">{shipment.senderPhone || 'N/A'}</p>
                  <p className="text-xs text-slate-400">{shipment.senderEmail || (shipment.senderUser?.email) || 'N/A'}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Receiver Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</label>
                  <p className="text-sm font-bold text-slate-700">{shipment.receiverName || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contact</label>
                  <p className="text-sm font-semibold text-slate-600">{shipment.receiverPhone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Address</label>
                  <p className="text-sm text-slate-600 leading-relaxed">{shipment.receiverAddress || 'N/A'}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Package Details */}
          <Card>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center text-orange-600">
                <Package size={20} />
              </div>
              <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Package Details</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Weight', value: `${shipment.weight || 0} kg` },
                { label: 'Dimensions (LxWxH)', value: shipment.packageDetails ? `${shipment.packageDetails.length || 0}x${shipment.packageDetails.width || 0}x${shipment.packageDetails.height || 0} cm` : 'N/A' },
                { label: 'Packages Count', value: shipment.packageDetails?.packagesCount || '1 Unit' },
                { label: 'Cost', value: `${shipment.cost || 0} ৳` },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded p-4 border border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{item.label}</label>
                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            {shipment.description && (
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Item Description</label>
                <div className="bg-blue-50/50 rounded p-5 border border-blue-100">
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{shipment.description}"
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons Below Content */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare size={18} /> Add Note
            </button>
            <button
              onClick={() => setIsUploadDocsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 rounded text-sm font-bold hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
            >
              <Upload size={18} /> Upload Docs
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pickup Information */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded bg-purple-50 flex items-center justify-center text-purple-600">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-800 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Pickup Information
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
                <p className="text-sm font-bold text-slate-700">{shipment.scheduledPickupDate ? new Date(shipment.scheduledPickupDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contact</label>
                <p className="text-sm font-semibold text-slate-700">{shipment.pickupContactName || 'N/A'} - {shipment.pickupContactPhone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Address</label>
                <p className="text-sm font-semibold text-slate-700">{shipment.pickupAddress || 'N/A'}</p>
              </div>
            </div>
          </Card>
          
          {/* Notes Log */}
          {shipment.statusNotes && shipment.statusNotes.length > 0 && (
            <Card>
              <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Notes Log</h3>
              <div className="space-y-3">
                {shipment.statusNotes.map((note: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-3 rounded">
                    <p className="text-xs text-slate-400 mb-1">{new Date(note.createdAt || Date.now()).toLocaleString()}</p>
                    <p className="text-sm text-slate-700">{note.note || note}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Help Card */}
          <div className="bg-blue-50 rounded p-6 border border-blue-100">
            <h4 className="font-bold text-slate-800 mb-2">Need Help?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              If you have any questions regarding this shipment, please contact our customer care.
            </p>
            <button className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded text-xs font-bold hover:bg-blue-50 transition-all cursor-pointer">
              Start Direct Chat
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal open={isAddNoteModalOpen} onCancel={() => setIsAddNoteModalOpen(false)} title="Add Note"
        footer={[
          <Button key="cancel" onClick={() => setIsAddNoteModalOpen(false)}>Cancel</Button>,
          <Button key="submit" type="primary" loading={isUpdating} onClick={handleAddNote} className="bg-blue-600">Save Note</Button>
        ]}>
        <div className="py-4">
          <Input.TextArea rows={4} value={note} onChange={e => setNote(e.target.value)} placeholder="Type your note here..." />
        </div>
      </Modal>

      <Modal open={isUploadDocsModalOpen} onCancel={() => { setIsUploadDocsModalOpen(false); setFileList([]); }} title="Upload Documents"
        footer={[
          <Button key="cancel" onClick={() => setIsUploadDocsModalOpen(false)}>Cancel</Button>,
          <Button key="submit" type="primary" loading={isUpdating} onClick={handleUploadDocs} className="bg-blue-600">Upload</Button>
        ]}>
        <div className="py-4 text-center">
          <AntUpload
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            beforeUpload={() => false}
            multiple
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
          </AntUpload>
        </div>
      </Modal>

    </div>
  );
};

export default ShipmentDetailsPage;
