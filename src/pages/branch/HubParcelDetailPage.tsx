import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button, message } from 'antd';
import Card from '../../components/ui/Card';

const HubParcelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mock data – fetch by id in production
  const parcel = {
    id: id || 'PRQ001',
    hubName: 'Uttara Hub',
    senderName: 'Mahfuj Alam',
    senderPhone: '+234 812 345 6789',
    senderEmail: 'mahfuj@example.com',
    destination: 'Lagos, Nigeria',
    description: 'Electronics and fragile glassware packed in a medium cardboard box. Requires careful handling during transit. Contains laptop, 2 glass items, and personal documents.',
    status: 'awaiting_pickup',
    date: '2024-03-21',
    imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=600&auto=format&fit=crop',
  };

  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-2xl font-black text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
            Package intake form
          </h1>
        </div>

        <div className="bg-white rounded shadow-sm p-8 space-y-8">
          {/* Customer Details */}
          <div>
            <p className={labelClass}>Customer Details</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  defaultValue={parcel.senderName}
                  readOnly
                  className="w-full border-none bg-slate-50 rounded px-4 py-3 text-sm text-slate-700 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input
                    type="text"
                    defaultValue={parcel.senderPhone}
                    readOnly
                    placeholder="+234 ..."
                    className="w-full border-none bg-slate-50 rounded px-4 py-3 text-sm text-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Destination address</label>
                  <input
                    type="text"
                    defaultValue={parcel.destination}
                    readOnly
                    placeholder="Street, City, State"
                    className="w-full border-none bg-slate-50 rounded px-4 py-3 text-sm text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div>
            <p className={labelClass}>Package Info</p>
            <textarea
              defaultValue={parcel.description}
              readOnly
              rows={4}
              placeholder="Describe the items in the parcel..."
              className="w-full border-none bg-slate-50 rounded px-4 py-3 text-sm text-slate-700 focus:outline-none resize-none"
            />
          </div>

          {/* Parcel Image */}
          <div>
            <p className={labelClass}>Parcel Image</p>
            {parcel.imageUrl ? (
              <div className="relative rounded overflow-hidden bg-slate-50 border border-dashed border-slate-200 h-52">
                <img
                  src={parcel.imageUrl}
                  alt="Parcel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full">
                    Hub Intake Photo — {parcel.hubName}
                  </span>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-44 border border-dashed border-slate-200 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                <Upload size={24} className="text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-600">Click to upload Parcel Image</span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG or JPEG (MAX. 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <Button
              className="h-11 px-8 rounded border-slate-300"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="h-11 px-10 rounded bg-[#1a237e] font-bold text-base shadow-md border-none"
              onClick={() => {
                message.success('Parcel received. Redirecting to create shipment...');
                navigate('/branch/create-shipment');
              }}
            >
              Take Parcel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubParcelDetailPage;
