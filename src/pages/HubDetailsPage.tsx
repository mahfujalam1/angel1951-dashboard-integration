import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Users, CheckCircle2, XCircle, Home, User, Briefcase, Heart } from 'lucide-react';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import type { Hub } from '../types';
import { hubs } from '../data/mockData';
import { Checkbox } from 'antd';

const HubDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const hub: Hub = location.state?.hub || hubs.find(h => h.id === id) || hubs[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Hub Details</h1>
        </div>
      </div>

      {/* Main Card with Illustration */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              John's Provision Store
            </h2>
            <div className="space-y-1">
              <p className="text-sm text-slate-400 font-medium">Registered Since Feb 20 2022</p>
              <p className="text-sm text-slate-400 font-medium">Approved by Sophiai Tan Admin on Feb 31 2022</p>
            </div>
          </div>
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-blue-50 rounded-full scale-90"></div>
            <img 
              src="https://img.freepik.com/free-vector/store-concept-illustration_114360-1238.jpg" 
              alt="Store" 
              className="w-full h-full object-contain relative z-10 rounded-2xl"
            />
          </div>
        </div>
      </Card>

      {/* 1. Shop Details */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">1.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Shop Details :</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ml-12">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">Shop Name John's Provision Store</p>
              <p className="text-xs text-slate-500">Business Type Provision Store</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 leading-relaxed">Full Address 55 Hillview Ave Singapore 589900</p>
              <p className="text-xs text-slate-500 mt-1">Landmark Near Hillview MRT Station</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs text-slate-500">City State Singapore</p>
            <p className="text-xs text-slate-500">555 Contact Number</p>
            <p className="text-xs text-slate-500">+65 8123 4567 johnsstore@email.com Google</p>
            <p className="text-xs text-slate-500">johnsstore@email.com</p>
          </div>
        </div>
      </div>

      {/* 2. Owner/ Manager Details */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">2.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Owner/ Manager Details :</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ml-12">
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Full Name:</span>
            <span className="text-xs font-bold text-slate-700">John Lim</span>
          </div>
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Phone Number:</span>
            <span className="text-xs font-bold text-slate-700">+65 9123 4567</span>
          </div>
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Email Address:</span>
            <span className="text-xs font-bold text-slate-700">johnsstore@email.com</span>
          </div>
        </div>
      </div>

      {/* 3. Shop Operations */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">3.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Shop Operations :</h3>
        </div>
        
        <div className="ml-12 space-y-6">
          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Opening Days:</span>
            <div className="flex gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu'].map(day => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox checked className="scale-90" />
                  <span className="text-xs text-slate-600 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Opening Hours:</span>
            <span className="text-xs font-bold text-slate-700">08:00 AM to 09:00 PM</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Number of Staff on Duty Daily:</span>
            <span className="text-xs font-bold text-slate-700">02</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Secure for Parcels:</span>
            <span className="text-xs font-bold text-slate-700">Yes</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Approx. Daily Foot Traffic:</span>
            <span className="text-xs font-bold text-slate-700">50-100</span>
          </div>
        </div>
      </div>

      {/* 5. Experience & Commitment */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">5.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Experience & Commitment :</h3>
        </div>
        
        <div className="ml-12 space-y-4">
          <p className="text-[10px] text-slate-500 font-medium">Used to handle delivery and logistics services</p>
          <p className="text-[10px] text-slate-500 font-medium">Willing to commit as pickup hub for at least 1 month</p>
          <p className="text-[10px] text-slate-500 font-medium">Special Note Handles fragile items with extra care</p>
          <p className="text-[10px] text-slate-500 font-medium">Preferred pickup hub near major MRT station</p>
        </div>
      </div>
    </div>
  );
};

export default HubDetailsPage;
