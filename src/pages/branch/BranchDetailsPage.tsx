import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Package, Clock, MapPin, 
  User, FileText, Info, Globe, 
  Plane, Truck, Shield, DollarSign,
  Mail, Phone, Calendar, Hash,
  Upload, CreditCard, ChevronRight,
  ExternalLink, Printer
} from 'lucide-react';
import { Button, Tag, Divider, Image } from 'antd';
import Card from '../../components/ui/Card';

const BranchDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data representing a fully filled shipment record
  const shipmentDetails = {
    id: id || 'ANGL-74291',
    status: 'In Transit',
    type: 'Nigeria to Abroad',
    createdAt: '2024-03-21 14:30',
    shipmentType: 'Air Cargo',
    serviceType: 'Warehouse',
    
    sender: {
      fullName: 'Mahfuj Alam',
      email: 'mahfuj@example.com',
      phone: '+234 812 345 6789',
      address: 'No 15, Airport Road, Ikeja',
      country: 'Nigeria',
      insurance: 'Yes',
      valueOfGoods: '$45,000'
    },
    
    package: {
      category: 'Electronics',
      weight: '12.5 KG',
      unit: 'KG',
      dimensions: '40x30x20 cm',
      description: 'Fragile electronics and computer parts.',
      imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=600&auto=format&fit=crop'
    },
    
    receiver: {
      fullName: 'John Smith',
      email: 'john.smith@uk.com',
      phone: '+44 7700 900077',
      address: '221B Baker Street, Marylebone',
      country: 'United Kingdom',
      zipCode: 'NW1 6XE'
    },
    
    logistics: {
      hub: 'Lagos Main Hub',
      pickupType: 'Doorstep Delivery',
      shippingType: 'Standard'
    },
    
    payment: {
      serviceType: 'Air Cargo',
      currency: 'USD ($)',
      amount: '$145.00',
      status: 'Paid'
    }
  };

  const labelClass = "text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1";
  const valueClass = "text-sm font-semibold text-slate-700";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
              <div className="flex items-center gap-2 mb-1">
                <Tag color="blue" className="rounded-full px-3 font-bold border-none bg-blue-600 text-white">{shipmentDetails.type}</Tag>
                <Tag color="processing" className="rounded-full px-3 font-bold">{shipmentDetails.status}</Tag>
              </div>
              <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                Shipment <span className="text-blue-600">#{shipmentDetails.id}</span>
              </h1>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button icon={<Printer size={16} />} className="h-11 rounded font-bold">Print Waybill</Button>
            <Button type="primary" icon={<ExternalLink size={16} />} className="h-11 rounded bg-blue-600 font-bold px-6">
              Track Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sender & Receiver Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card 
                title={<span className="flex items-center gap-2"><User size={18} className="text-blue-600" /> Sender Information</span>}
                className="h-full border-none shadow-sm"
              >
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <p className={valueClass}>{shipmentDetails.sender.fullName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone</label>
                      <p className={valueClass}>{shipmentDetails.sender.phone}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <p className={valueClass}>{shipmentDetails.sender.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Detailed Address</label>
                    <p className={valueClass}>{shipmentDetails.sender.address}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">{shipmentDetails.sender.country} 🇳🇬</p>
                  </div>
                </div>
              </Card>

              <Card 
                title={<span className="flex items-center gap-2"><MapPin size={18} className="text-blue-600" /> Receiver Information</span>}
                className="h-full border-none shadow-sm"
              >
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <p className={valueClass}>{shipmentDetails.receiver.fullName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Phone</label>
                      <p className={valueClass}>{shipmentDetails.receiver.phone}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Zip Code</label>
                      <p className={valueClass}>{shipmentDetails.receiver.zipCode}</p>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Delivery Address</label>
                    <p className={valueClass}>{shipmentDetails.receiver.address}</p>
                    <p className="text-xs font-bold text-blue-600 mt-1">{shipmentDetails.receiver.country} 🇬🇧</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Package Details */}
            <Card 
              title={<span className="flex items-center gap-2"><Package size={18} className="text-blue-600" /> Package & Item Details</span>}
              className="border-none shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Category</label>
                      <Tag color="cyan" className="rounded font-bold border-none">{shipmentDetails.package.category}</Tag>
                    </div>
                    <div>
                      <label className={labelClass}>Weight</label>
                      <p className="text-lg font-black text-slate-800">{shipmentDetails.package.weight}</p>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Item Description</label>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded border border-slate-100">
                      {shipmentDetails.package.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Insurance</label>
                      <Tag color={shipmentDetails.sender.insurance === 'Yes' ? 'green' : 'default'} className="font-bold">
                        {shipmentDetails.sender.insurance === 'Yes' ? 'INSURED' : 'NO INSURANCE'}
                      </Tag>
                    </div>
                    <div>
                      <label className={labelClass}>Declared Value</label>
                      <p className="text-sm font-bold text-emerald-600">{shipmentDetails.sender.valueOfGoods}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={labelClass}>Package Image</label>
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded p-2 h-56 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={shipmentDetails.package.imageUrl} 
                      className="rounded object-cover h-full"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Columns */}
          <div className="space-y-8">
            {/* Payment Summary */}
            <Card 
              title={<span className="flex items-center gap-2"><CreditCard size={18} className="text-blue-600" /> Payment & Billing</span>}
              className="border-none shadow-sm bg-blue-600 text-white"
            >
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Payable Amount</label>
                  <p className="text-4xl font-black text-white tracking-tighter">{shipmentDetails.payment.amount}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-blue-500/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Currency</span>
                    <span className="font-bold">{shipmentDetails.payment.currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Service</span>
                    <span className="font-bold">{shipmentDetails.payment.serviceType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-200">Status</span>
                    <Tag color="green" className="m-0 font-bold border-none bg-green-400 text-white">SUCCESS</Tag>
                  </div>
                </div>
                
                <Button block className="h-12 rounded bg-white text-blue-600 border-none font-bold shadow-md shadow-blue-900/20">
                  View Receipt
                </Button>
              </div>
            </Card>

            {/* Logistics Info */}
            <Card 
              title={<span className="flex items-center gap-2"><Truck size={18} className="text-blue-600" /> Logistics Details</span>}
              className="border-none shadow-sm"
            >
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Processing Hub</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                      <Truck size={14} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{shipmentDetails.logistics.hub}</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Pickup Method</label>
                  <p className={valueClass}>{shipmentDetails.logistics.pickupType}</p>
                </div>
                <div>
                  <label className={labelClass}>Shipping Preference</label>
                  <p className={valueClass}>{shipmentDetails.logistics.shippingType}</p>
                </div>
                <div>
                  <label className={labelClass}>Created On</label>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    {shipmentDetails.createdAt}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetailsPage;
