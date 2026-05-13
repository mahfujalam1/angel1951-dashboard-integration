import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Package, DollarSign, CheckCircle, Mail, Phone } from 'lucide-react';
import { Button, Tag, InputNumber, message } from 'antd';
import Card from '../../components/ui/Card';

const CorporateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assignedPrice, setAssignedPrice] = useState<number | null>(null);

  // Mock data - fetch by id in production
  const request = {
    id: id || 'CORP-001',
    senderCompany: 'TechCorp Solutions',
    senderEmail: 'logistics@techcorp.com',
    senderPhone: '+880 1912 345678',
    orgId: 'TC-2024',
    origin: 'Dhaka, BD',
    destination: 'London, UK',
    packageType: 'Electronics',
    weight: '22 KG',
    receiverName: 'James Wilson',
    receiverPhone: '+44 7700 900001',
    receiverAddress: '12 Oxford Street, London, W1D 1LS',
    items: 'Server hardware components and networking equipment. Fragile — handle with care.',
    requestDate: '2024-03-21',
    status: 'pending',
  };

  const handleCreateShipment = () => {
    if (!assignedPrice || assignedPrice <= 0) {
      message.error('Please assign a price before creating the shipment');
      return;
    }
    message.success(`Shipment created for ${request.senderCompany} at $${assignedPrice}. Invoice will be generated.`);
    navigate('/branch/corporate-shipments');
  };

  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1";
  const valueClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Tag color="purple">CORPORATE</Tag>
              <span className="text-xs text-slate-400">#{request.id}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
              {request.senderCompany}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Partner Info */}
          <Card title={<span className="flex items-center gap-2"><Building2 size={16} className="text-blue-600" /> Partner Information</span>} className="border-none shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
              <div>
                <label className={labelClass}>Organization</label>
                <p className={valueClass}>{request.senderCompany}</p>
              </div>
              <div>
                <label className={labelClass}>Org ID</label>
                <p className={valueClass}>{request.orgId}</p>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{request.senderEmail}</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{request.senderPhone}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Shipment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={<span className="flex items-center gap-2"><Package size={16} className="text-blue-600" /> Package Details</span>} className="border-none shadow-sm h-full">
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Package Type</label>
                    <Tag color="cyan" className="font-bold">{request.packageType}</Tag>
                  </div>
                  <div>
                    <label className={labelClass}>Weight</label>
                    <p className="text-lg font-black text-slate-800">{request.weight}</p>
                  </div>
                  <div>
                    <label className={labelClass}>Origin</label>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <p className={valueClass}>{request.origin}</p>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Destination</label>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400" />
                      <p className={valueClass}>{request.destination}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Item Description</label>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{request.items}</p>
                </div>
              </div>
            </Card>

            <Card title={<span className="flex items-center gap-2"><MapPin size={16} className="text-blue-600" /> Receiver Details</span>} className="border-none shadow-sm h-full">
              <div className="space-y-4 py-2">
                <div>
                  <label className={labelClass}>Receiver Name</label>
                  <p className={valueClass}>{request.receiverName}</p>
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <p className={valueClass}>{request.receiverPhone}</p>
                </div>
                <div>
                  <label className={labelClass}>Delivery Address</label>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">{request.receiverAddress}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Price Assignment */}
          <Card title={<span className="flex items-center gap-2"><DollarSign size={16} className="text-blue-600" /> Assign Price & Create Shipment</span>} className="border-none shadow-sm">
            <div className="py-2 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Final Shipment Price (USD)</label>
                <InputNumber
                  className="w-full md:w-80 h-11 rounded-lg flex items-center text-base font-bold"
                  placeholder="Enter amount"
                  min={0}
                  value={assignedPrice}
                  onChange={(val) => setAssignedPrice(val)}
                  prefix={<span className="text-slate-400 mr-1">$</span>}
                  size="large"
                />
                <p className="text-xs text-slate-400 mt-2 italic">
                  * After confirming, the shipment will be created and an invoice will be generated for <strong>{request.senderCompany}</strong>.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="primary"
                  icon={<CheckCircle size={16} className="mr-1" />}
                  className="h-11 px-8 rounded-lg bg-blue-600 font-bold"
                  onClick={handleCreateShipment}
                >
                  Assign Price & Create Shipment
                </Button>
                <Button
                  className="h-11 px-6 rounded-lg"
                  onClick={() => navigate('/branch/corporate-shipments')}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorporateDetailPage;
