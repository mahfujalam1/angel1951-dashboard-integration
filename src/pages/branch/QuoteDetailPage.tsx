import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Package, Calculator, Send, Mail, Phone, Calendar, XCircle } from 'lucide-react';
import { Button, Tag, InputNumber, message, Modal } from 'antd';
import Card from '../../components/ui/Card';

const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelNote, setCancelNote] = useState('');

  // Mock data - in production this would be fetched by id
  const quote = {
    id: id || 'QR001',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+880 1712 345678',
    origin: 'Dhaka, BD',
    destination: 'London, UK',
    weight: '5.2 KG',
    dimensions: '30x20x15 cm',
    serviceType: 'Air Cargo',
    items: 'Personal documents and 2 laptops. Please handle with care as laptops are fragile.',
    status: 'pending',
    requestDate: '2024-03-20',
  };

  const handleSend = () => {
    if (!budget || budget <= 0) {
      message.error('Please enter a valid budget amount');
      return;
    }
    message.success(`Budget proposal of $${budget} sent to ${quote.email} via email`);
    navigate('/branch/quotes');
  };

  const handleCancelSubmit = () => {
    if (!cancelNote.trim()) {
      message.error('Please enter a note before submitting');
      return;
    }
    message.info(`Quote #${quote.id} declined. Note sent to ${quote.email}`);
    setCancelModalOpen(false);
    navigate('/branch/quotes');
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
              <Tag color={quote.status === 'pending' ? 'orange' : 'green'}>
                {quote.status.toUpperCase()}
              </Tag>
              <span className="text-xs text-slate-400">#{quote.id}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
              Quote Request Details
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          {/* Customer Info */}
          <Card title={<span className="flex items-center gap-2"><User size={16} className="text-blue-600" /> Customer Information</span>} className="border-none shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
              <div>
                <label className={labelClass}>Full Name</label>
                <p className={valueClass}>{quote.customerName}</p>
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{quote.email}</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{quote.phone}</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Request Date</label>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{quote.requestDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Shipment Details */}
          <Card title={<span className="flex items-center gap-2"><Package size={16} className="text-blue-600" /> Shipment Inquiry Details</span>} className="border-none shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-2">
              <div>
                <label className={labelClass}>Service Type</label>
                <Tag color="cyan" className="font-bold">{quote.serviceType}</Tag>
              </div>
              <div>
                <label className={labelClass}>Origin</label>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <p className={valueClass}>{quote.origin}</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Destination</label>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  <p className={valueClass}>{quote.destination}</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>Weight</label>
                <p className="text-lg font-black text-slate-800">{quote.weight}</p>
              </div>
              <div>
                <label className={labelClass}>Dimensions</label>
                <p className={valueClass}>{quote.dimensions}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <label className={labelClass}>Items Description</label>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-4 mt-1">{quote.items}</p>
            </div>
          </Card>

          {/* Assign Budget */}
          <Card title={<span className="flex items-center gap-2"><Calculator size={16} className="text-blue-600" /> Assign Budget Proposal</span>} className="border-none shadow-sm">
            <div className="py-2 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Budget (USD)</label>
                <InputNumber
                  className="w-full md:w-80 h-11 rounded-lg flex items-center text-base font-bold"
                  placeholder="Enter budget amount"
                  min={0}
                  value={budget}
                  onChange={(val) => setBudget(val)}
                  prefix={<span className="text-slate-400 mr-1">$</span>}
                  size="large"
                />
                <p className="text-xs text-slate-400 mt-2 italic">
                  * This proposal will be sent to the customer's email <strong>{quote.email}</strong> for approval.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="primary"
                  icon={<Send size={16} className="mr-1" />}
                  className="h-11 px-8 rounded-lg bg-blue-600 font-bold"
                  onClick={handleSend}
                >
                  Send Budget Proposal
                </Button>
                <Button
                  danger
                  icon={<XCircle size={16} className="mr-1" />}
                  className="h-11 px-6 rounded-lg"
                  onClick={() => setCancelModalOpen(true)}
                >
                  Decline Request
                </Button>
              </div>

              {/* Cancel Note Modal */}
              <Modal
                title="Decline Quote Request"
                open={cancelModalOpen}
                onCancel={() => setCancelModalOpen(false)}
                footer={[
                  <Button key="back" onClick={() => setCancelModalOpen(false)}>Go Back</Button>,
                  <Button key="submit" danger onClick={handleCancelSubmit}>Submit & Notify Customer</Button>,
                ]}
              >
                <div className="py-4 space-y-3">
                  <p className="text-sm text-slate-600">Please provide a reason for declining this quote request. This note will be sent to <strong>{quote.email}</strong>.</p>
                  <textarea
                    rows={4}
                    placeholder="Enter your note here..."
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-blue-400 resize-none"
                    value={cancelNote}
                    onChange={e => setCancelNote(e.target.value)}
                  />
                </div>
              </Modal>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
