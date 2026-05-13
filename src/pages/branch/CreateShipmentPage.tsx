import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import { Globe, Plane, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InternationalForm from '../../components/forms/InternationalForm';
import NigeriaToAbroadForm from '../../components/forms/NigeriaToAbroadForm';

const { TabPane } = Tabs;

const CreateShipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('international');

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                Create New Shipment
              </h1>
              <p className="text-slate-500 text-sm">Fill in the details to generate a new shipment record</p>
            </div>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('international')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'international' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              International
            </button>
            <button 
              onClick={() => setActiveTab('nigeria')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'nigeria' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              Nigeria to Abroad
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="mt-6">
          {activeTab === 'international' ? (
            <InternationalForm />
          ) : (
            <NigeriaToAbroadForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipmentPage;
