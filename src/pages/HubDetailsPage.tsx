import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Users, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import type { Hub } from '../types';
import { hubs } from '../data/mockData';

const HubDetailsPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const hub: Hub = location.state?.hub || hubs.find(h => h.id === id) || hubs[0];

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
          <ArrowLeft size={17} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Hub Details</h1>
          <p className="text-xs text-slate-400">Viewing full information for this hub</p>
        </div>
      </div>

      {/* Hub card */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
                John's Provision Store
              </h2>
              <StatusBadge status={hub.status} />
            </div>
            <p className="text-sm text-slate-400">Registered Since Feb 20 2022</p>
            <p className="text-sm text-slate-400">Approved by Sophia Tan Admin on Feb 21 2022</p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl flex-shrink-0">
            🏪
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Staff Count', value: hub.staffCount || 12, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Today Received', value: hub.throughput.split('/')[0].trim() || '120 Rcv', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Today Departed', value: hub.throughput.split('/')[1]?.trim() || '85 Dep', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
              <div className={`text-lg font-bold ${s.color}`} style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Shop Details */}
        <Card title="Shop Details">
          <div className="space-y-3">
            {[
              { icon: <MapPin size={14} />, label: 'Address', value: hub.address || '55 Hillview Ave Singapore 669950' },
              { icon: <Phone size={14} />, label: 'Contact', value: hub.contactNumber },
              { icon: <Mail size={14} />, label: 'Email', value: hub.email },
              { icon: <MapPin size={14} />, label: 'Location', value: hub.hubLocation },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Owner & Operations */}
        <div className="space-y-5">
          <Card title="Owner / Manager">
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: hub.manager || 'John Lim' },
                { label: 'Phone', value: '+65 9123 4567' },
                { label: 'Email', value: hub.email },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                  <span className="text-sm font-semibold text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Shop Operations">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">Opening Days</p>
                <div className="flex gap-1.5 flex-wrap">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => {
                    const active = (hub.openDays || ['Mon','Tue','Wed','Thu','Fri']).includes(d);
                    return (
                      <span key={d} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${active ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-300'}`}>
                        {d}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                <Clock size={14} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">{hub.hours || '09:00 AM - 06:00 PM'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400">Staff on Duty</p>
                  <p className="font-bold text-slate-700 mt-0.5">02</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400">Foot Traffic</p>
                  <p className="font-bold text-slate-700 mt-0.5">50–100</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HubDetailsPage;
