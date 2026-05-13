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
import { message } from 'antd';
import Card from '../components/ui/Card';
import { shipments } from '../data/mockData';
import AssignHubModal from '../modal/AssignHubModal';
import AssignStaffModal from '../modal/AssignStaffModal';
import AddNoteModal from '../modal/AddNoteModal';
import UploadDocsModal from '../modal/UploadDocsModal';

const ShipmentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAssignHubModalOpen, setIsAssignHubModalOpen] = useState(false);
  const [isAssignStaffModalOpen, setIsAssignStaffModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isUploadDocsModalOpen, setIsUploadDocsModalOpen] = useState(false);

  const shipment = shipments.find(s => s.id === id) || shipments[0];

  const handleAssignHub = (values: any) => {
    message.success(`Hub assigned: ${values.hub}`);
    setIsAssignHubModalOpen(false);
  };

  const handleAssignStaff = (values: any) => {
    message.success(`Staff assigned: ${values.staff}`);
    setIsAssignStaffModalOpen(false);
  };

  const handleAddNote = (values: any) => {
    message.success('Note added successfully');
    setIsAddNoteModalOpen(false);
  };

  const handleUploadDocs = (values: any) => {
    message.success('Documents uploaded successfully');
    setIsUploadDocsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
              Shipment Details: <span className="text-blue-600">#{shipment.trackingId}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium">Package is currently in transit</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAssignHubModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <Building2 size={16} /> Assign Hub
          </button>
          <button
            onClick={() => setIsAssignStaffModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <UserCheck size={16} /> Assign Staff
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-3 inline-block">Current Status</span>
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Arrived at Dhaka Transit Point</h2>
              <p className="text-blue-100 text-sm">Last Update: October 12, 2024 | 03:45 PM</p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Truck size={32} />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Plus size={20} className="rotate-45" />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Sender Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</label>
                  <p className="text-sm font-bold text-slate-700">Arif Ahmed</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contact</label>
                  <p className="text-sm font-semibold text-slate-600">+880 1712-345678</p>
                  <p className="text-xs text-slate-400">arif.ahmed@email.com</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Address</label>
                  <p className="text-sm text-slate-600 leading-relaxed">House #24, Road #10, Banani DOHS, Dhaka - 1206</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Plus size={20} className="rotate-45" />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Receiver Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</label>
                  <p className="text-sm font-bold text-slate-700">Sajidur Rahman</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Contact</label>
                  <p className="text-sm font-semibold text-slate-600">+880 1823-456789</p>
                  <p className="text-xs text-slate-400">sajid.r@email.com</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Address & Postal Code</label>
                  <p className="text-sm text-slate-600 leading-relaxed">402, Shah Makhdum Road, Rajshahi - 6000</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Package Details */}
          <Card>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Package size={20} />
              </div>
              <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Package Details</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Weight', value: '8.5 kg' },
                { label: 'Dimensions (LxWxH)', value: '40x30x20 cm' },
                { label: 'Declared Value', value: '12,500 $' },
                { label: 'Items Count', value: '3 Units' },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{item.label}</label>
                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Item Description</label>
              <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "Electronics and computer accessories. Fragile items, handle with care."
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons Below Content */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              <MessageSquare size={18} /> Add Note
            </button>
            <button
              onClick={() => setIsUploadDocsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              <Upload size={18} /> Upload Docs
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Payment Summary</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600">Paid</span>
            </div>

            <div className="space-y-3 pb-6 border-b border-dashed border-slate-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Shipping Charges</span>
                <span className="font-semibold text-slate-700">1,200.00 $</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Insurance</span>
                <span className="font-semibold text-slate-700">350.00 $</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">VAT (5%)</span>
                <span className="font-semibold text-slate-700">77.50 $</span>
              </div>
            </div>

            <div className="py-6 border-b border-dashed border-slate-200">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Grand Total</span>
                  <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Sora, sans-serif' }}>1,627.50 $</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3 text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">Payment Method</p>
                <p className="text-xs font-semibold">Visa Card (**** 8890)</p>
              </div>
            </div>
          </Card>

          {/* Help Card */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-slate-800 mb-2">Need Help?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              If you have any questions regarding this shipment, please contact our customer care.
            </p>
            <button className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition-all">
              Start Direct Chat
            </button>
          </div>

          {/* Pickup Information */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-800 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Pickup Information
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date & Time</label>
                <p className="text-sm font-bold text-slate-700">10 October, 2024</p>
                <p className="text-xs text-slate-500">10:30 AM</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Location</label>
                <p className="text-sm font-semibold text-slate-700">Banani Pickup Hub, Dhaka</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <AssignHubModal
        open={isAssignHubModalOpen}
        onCancel={() => setIsAssignHubModalOpen(false)}
        onFinish={handleAssignHub}
      />

      <AssignStaffModal
        open={isAssignStaffModalOpen}
        onCancel={() => setIsAssignStaffModalOpen(false)}
        onFinish={handleAssignStaff}
      />

      <AddNoteModal
        open={isAddNoteModalOpen}
        onCancel={() => setIsAddNoteModalOpen(false)}
        onFinish={handleAddNote}
      />

      <UploadDocsModal
        open={isUploadDocsModalOpen}
        onCancel={() => setIsUploadDocsModalOpen(false)}
        onFinish={handleUploadDocs}
      />
    </div>
  );
};

export default ShipmentDetailsPage;
