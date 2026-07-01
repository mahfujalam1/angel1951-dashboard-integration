import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Users, User, Briefcase, Heart, Calendar, ShieldCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Checkbox } from 'antd';
import { staffList } from '../data/mockData';
import type { Staff } from '../types';

const StaffDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const staff: Staff = location.state?.staff || staffList.find(s => s.id === id) || staffList[0];

  return (
    <div className="space-y-6 p-5">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 shadow-sm">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Staff Details</h1>
          <p className="text-xs text-slate-400 font-medium">Viewing profile for {staff.name}</p>
        </div>
      </div>

      {/* Main Card with Staff Profile */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
          <div className="flex items-center gap-6 flex-1">
            <div className="w-24 h-24 rounded bg-blue-50 flex items-center justify-center text-4xl shadow-md relative overflow-hidden border border-white ring-1 ring-slate-100">
              {staff.avatar ? (
                <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-blue-300">{staff.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {staff.name}
                </h2>
                <StatusBadge status={staff.status} />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                  <Briefcase size={14} /> {staff.role} Specialist
                </p>
                <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                  <Calendar size={14} /> Joined {staff.joinDate}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto flex gap-3">
            <div className="flex-1 md:flex-none px-6 py-3 bg-slate-50 rounded border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Deliveries</p>
              <p className="text-xl font-bold text-blue-600">{staff.deliveries}</p>
            </div>
            <div className="flex-1 md:flex-none px-6 py-3 bg-slate-50 rounded border border-slate-100 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Rating</p>
              <p className="text-xl font-bold text-emerald-600">4.9</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 1. Personal & Contact Details */}
      <div className="bg-white rounded p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">1.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Personal Information :</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ml-12">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
              <p className="text-sm font-bold text-slate-800">{staff.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-sm font-semibold text-slate-700">{staff.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
              <p className="text-sm font-mono font-bold text-slate-700">{staff.contact}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Hub</p>
              <p className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
                <MapPin size={14} /> {staff.hub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Employment Details */}
      <div className="bg-white rounded p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">2.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Employment Details :</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 ml-12">
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Employee ID:</span>
            <span className="text-xs font-bold text-slate-700">EMP-2024-{staff.id.padStart(3, '0')}</span>
          </div>
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Work Shift:</span>
            <span className="text-xs font-bold text-slate-700">Day Shift (08:00 AM - 05:00 PM)</span>
          </div>
          <div className="flex justify-between items-center max-w-sm">
            <span className="text-xs text-slate-400">Contract Type:</span>
            <span className="text-xs font-bold text-slate-700">Full-Time Permanent</span>
          </div>
        </div>
      </div>

      {/* 3. Operational Performance */}
      <div className="bg-white rounded p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">3.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Work Schedule & Duty :</h3>
        </div>

        <div className="ml-12 space-y-6">
          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Active Duty Days:</span>
            <div className="flex gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox checked className="scale-90" />
                  <span className="text-xs text-slate-600 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Avg. Completion Time:</span>
            <span className="text-xs font-bold text-slate-700">45 mins per delivery</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Assigned Vehicle:</span>
            <span className="text-xs font-bold text-slate-700">Motorbike (Dhaka-Metro-HA-1234)</span>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-xs text-slate-400 w-32">Verified Background:</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck size={14} /> Yes, Cleared
            </span>
          </div>
        </div>
      </div>

      {/* 5. Experience & Commitment */}
      <div className="bg-white rounded p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-8 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">5.</div>
          <h3 className="text-lg font-bold text-slate-800 pt-1" style={{ fontFamily: 'Sora, sans-serif' }}>Commitment & Notes :</h3>
        </div>

        <div className="ml-12 space-y-4">
          <p className="text-[10px] text-slate-500 font-medium italic">"Exceptional performance in last quarter. Highly recommended for fragile item handling."</p>
          <p className="text-[10px] text-slate-500 font-medium">Languages: English, Bengali, Hindi</p>
          <p className="text-[10px] text-slate-500 font-medium">Emergency Contact: +880 1234-567890 (Relative)</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsPage;
