import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, Image as ImageIcon, Eye, UserCheck } from 'lucide-react';
import { Tag, Button } from 'antd';
import Card from '../../components/ui/Card';

const ShipmentTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const timelineSteps = [
    { status: 'Shipment Created', date: 'Feb 18, 14:00', completed: true, active: false },
    { status: 'Picked by staff', date: 'Feb 18, 14:00', completed: true, active: false },
    { status: 'Arrived at Hub', date: 'Feb 18, 14:00', completed: false, active: false },
    { status: 'Departed from Hub', date: 'Feb 18, 14:00', completed: false, active: true },
    { status: 'Out for Delivery', date: 'Feb 18, 14:00', completed: false, active: false },
    { status: 'Delivered', date: 'Feb 18, 14:00', completed: false, active: false },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 transition-colors p-1"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
             <Tag color="blue" className="rounded-full px-4 py-0.5 border-none bg-blue-100 text-blue-600 font-bold">In Transit</Tag>
             <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>#{id || 'BN123456'}</h1>
          </div>
        </div>
        <p className="text-slate-400 text-xs font-medium ml-12 mb-8">Last Update: February 15, 2026 | 08:45 AM</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Timeline */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm h-full">
              <h3 className="text-sm font-bold text-slate-800 mb-8 px-2">Shipment Timeline</h3>
              <div className="space-y-0 relative">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 min-h-[80px]">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                        step.completed ? 'bg-green-500' : 
                        step.active ? 'bg-white border-4 border-blue-500' : 'bg-white border-2 border-slate-200'
                      }`}>
                        {step.completed && <CheckCircle2 size={14} className="text-white" />}
                        {step.active && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      {index !== timelineSteps.length - 1 && (
                        <div className={`w-0.5 flex-1 ${step.completed ? 'bg-green-500' : 'bg-slate-200'}`} />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className={`text-sm font-bold ${step.completed || step.active ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-slate-400 font-medium">{step.date}</p>
                    </div>
                    <div className="ml-auto">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.active ? 'border-blue-500' : 'border-slate-200'}`}>
                            {step.active && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Media & Signature */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6">Proof & Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Pickup Photo', sub: 'Hub Receiving Photo', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop' },
                  { label: 'Delivery Confirmation Photo', sub: 'Photo', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400&auto=format&fit=crop' },
                  { label: 'Delivery Confirmation Photo', sub: 'Photo', comingSoon: true }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="relative group rounded-xl overflow-hidden bg-slate-50 border border-slate-100 h-32 flex items-center justify-center">
                      {item.comingSoon ? (
                        <Tag color="blue" className="rounded-full px-4 border-none bg-blue-50 text-blue-600 font-bold">Coming Soon</Tag>
                      ) : (
                        <>
                          <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button type="primary" size="small" icon={<Eye size={14} />} className="bg-blue-600 rounded-full text-[10px] font-bold">
                              View
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-800 leading-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-sm font-bold text-slate-800 mb-1">Receiver Signature</h3>
                   <p className="text-xs text-slate-400 font-medium">Pending</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                   <UserCheck size={20} className="text-slate-200" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTrackingPage;
