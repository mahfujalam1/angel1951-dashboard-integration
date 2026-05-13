import React, { useState } from 'react';
import { Gift, Users, ArrowRight, Percent, Scale, Edit2, Check, X } from 'lucide-react';
import { Select, InputNumber, Button, message } from 'antd';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import AppTable from '../components/ui/AppTable';
import Avatar from '../components/ui/Avatar';

const ReferralProgramPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [serviceType, setServiceType] = useState('air-cargo');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [discountKg, setDiscountKg] = useState(2);
  const [isEditing, setIsEditing] = useState(false);

  const referralData = [
    { id: '1', referrer: { name: 'Arif Ahmed', email: 'arif@email.com', avatar: '' }, referred: { name: 'Sajid Rahman', email: 'sajid@email.com', avatar: '' }, date: 'Oct 12, 2024', status: 'Completed', reward: '$20.00' },
    { id: '2', referrer: { name: 'Kamal Hossain', email: 'kamal@email.com', avatar: '' }, referred: { name: 'Nasim Ali', email: 'nasim@email.com', avatar: '' }, date: 'Oct 10, 2024', status: 'Pending', reward: '$15.00' },
    { id: '3', referrer: { name: 'Rahat Khan', email: 'rahat@email.com', avatar: '' }, referred: { name: 'Mitu Akter', email: 'mitu@email.com', avatar: '' }, date: 'Oct 08, 2024', status: 'Completed', reward: '$25.00' },
    { id: '4', referrer: { name: 'Jannat Begum', email: 'jannat@email.com', avatar: '' }, referred: { name: 'Liton Mia', email: 'liton@email.com', avatar: '' }, date: 'Oct 05, 2024', status: 'Expired', reward: '$0.00' },
  ];

  const columns = [
    {
      title: 'Referrer',
      key: 'referrer',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar name={record.referrer.name} size={32} />
          <div>
            <div className="text-sm font-semibold text-slate-700">{record.referrer.name}</div>
            <div className="text-xs text-slate-400">{record.referrer.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '',
      key: 'arrow',
      width: 50,
      render: () => <ArrowRight size={14} className="text-slate-300" />,
    },
    {
      title: 'Referred User',
      key: 'referred',
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar name={record.referred.name} size={32} />
          <div>
            <div className="text-sm font-semibold text-slate-700">{record.referred.name}</div>
            <div className="text-xs text-slate-400">{record.referred.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (v: string) => <span className="text-xs text-slate-500 font-medium">{v}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
          ${s === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
            s === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
          {s}
        </span>
      ),
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      key: 'reward',
      render: (v: string) => <span className="text-sm font-bold text-blue-600">{v}</span>,
    },
  ];

  const handleSaveSettings = () => {
    setIsEditing(false);
    message.success('Referral settings updated successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Referral Program" 
        searchPlaceholder="Search referrer or referred..." 
        onSearch={setSearch} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Recent Referrals">
            <AppTable 
              columns={columns} 
              data={referralData} 
              total={referralData.length} 
              pageSize={10} 
              current={page} 
              onPageChange={setPage} 
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Gift size={20} />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Program Settings</h3>
              </div>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all rounded-lg"
                >
                  <Edit2 size={16} />
                </button>
              ) : (
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-red-50 text-red-500 transition-all rounded-lg"
                  >
                    <X size={16} />
                  </button>
                  <button 
                    onClick={handleSaveSettings}
                    className="p-2 hover:bg-emerald-50 text-emerald-500 transition-all rounded-lg"
                  >
                    <Check size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Type</label>
                <Select 
                  disabled={!isEditing}
                  value={serviceType} 
                  onChange={setServiceType}
                  className="w-full"
                  style={{ borderRadius: 12 }}
                  options={[
                    { value: 'air-cargo', label: 'Air Cargo' },
                    { value: 'sea-freight', label: 'Sea Freight' },
                    { value: 'local-delivery', label: 'Local Delivery' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Discount (%)</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Percent size={14} />
                    </div>
                    <InputNumber 
                      disabled={!isEditing}
                      min={0} 
                      max={100} 
                      value={discountPercent} 
                      onChange={(v) => setDiscountPercent(v || 0)}
                      className="w-full pl-7"
                      style={{ borderRadius: 12, height: 40, display: 'flex', alignItems: 'center' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Per KG ($)</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Scale size={14} />
                    </div>
                    <InputNumber 
                      disabled={!isEditing}
                      min={0} 
                      value={discountKg} 
                      onChange={(v) => setDiscountKg(v || 0)}
                      className="w-full pl-7"
                      style={{ borderRadius: 12, height: 40, display: 'flex', alignItems: 'center' }}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="pt-2">
                  <Button 
                    type="primary" 
                    block 
                    size="large" 
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700 h-11 font-bold"
                    style={{ borderRadius: 12 }}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
            <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Boost Referrals!</h4>
            <p className="text-blue-100 text-xs leading-relaxed mb-6">
              Higher discount rates usually lead to 40% more successful referrals. Consider adjusting your program rates during holidays.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-blue-100" />
                ))}
              </div>
              <span className="text-xs font-medium text-blue-50">+124 referrals this week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgramPage;
