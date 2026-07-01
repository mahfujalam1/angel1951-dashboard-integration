import React, { useState, useEffect } from 'react';
import { Gift, Users, ArrowRight, Percent, Scale, Edit2, Check, X, Tag, FileText, Hash } from 'lucide-react';
import { Select, InputNumber, Button, message, Input, Switch, Skeleton } from 'antd';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import AppTable from '../components/ui/AppTable';
import Avatar from '../components/ui/Avatar';
import { useCreateOrUpdateRewardRuleMutation, useToggleRewardRuleMutation, useGetRewardRulesQuery } from '../redux/api/rewardsApi';

const ReferralProgramPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  // Form State
  const [rewardType, setRewardType] = useState('AIR_CARGO');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [freeKgLimit, setFreeKgLimit] = useState(0);
  const [thresholdCount, setThresholdCount] = useState(2);
  const [thresholdWeight, setThresholdWeight] = useState(100);
  const [isActive, setIsActive] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);

  const { data: rulesResponse, isLoading: isLoadingRules } = useGetRewardRulesQuery();
  const rules = rulesResponse?.data || [];

  const [createOrUpdate, { isLoading: isSaving }] = useCreateOrUpdateRewardRuleMutation();
  const [toggleStatus, { isLoading: isToggling }] = useToggleRewardRuleMutation();

  // Populate form when reward type changes or data loads
  useEffect(() => {
    if (rules && rules.length > 0) {
      const selectedRule = rules.find((r: any) => r.rewardType === rewardType);
      if (selectedRule) {
        setName(selectedRule.name || '');
        setDescription(selectedRule.description || '');
        setDiscountPercent(selectedRule.discountPercent || 0);
        setFreeKgLimit(selectedRule.freeKgLimit || 0);
        setThresholdCount(selectedRule.thresholdCount || 0);
        setThresholdWeight(selectedRule.thresholdWeight || 0);
        setIsActive(selectedRule.isActive ?? true);
      } else {
        // Reset to defaults if no rule exists for this type yet
        setName('');
        setDescription('');
        setDiscountPercent(0);
        setFreeKgLimit(0);
        setThresholdCount(0);
        setThresholdWeight(0);
        setIsActive(false);
      }
    }
  }, [rewardType, rules]);

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

  const handleSaveSettings = async () => {
    try {
      await createOrUpdate({
        rewardType,
        name: name || `${rewardType} Reward`,
        description: description || 'No description',
        thresholdCount,
        thresholdWeight,
        discountPercent,
        freeShipment: freeKgLimit > 0,
        freeKgLimit,
        isActive,
      }).unwrap();
      
      setIsEditing(false);
      message.success('Reward rule updated successfully');
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to update reward rule');
    }
  };

  const handleToggle = async (checked: boolean) => {
    try {
      await toggleStatus({ rewardType, isActive: checked }).unwrap();
      setIsActive(checked);
      message.success(`Reward rule ${checked ? 'activated' : 'deactivated'}`);
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to toggle status');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Referral & Rewards" 
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
                <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Gift size={20} />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Reward Rule Setup</h3>
              </div>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all rounded cursor-pointer"
                >
                  <Edit2 size={16} />
                </button>
              ) : (
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-red-50 text-red-500 transition-all rounded cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                  <button 
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="p-2 hover:bg-emerald-50 text-emerald-500 transition-all rounded cursor-pointer"
                  >
                    <Check size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Reward Type</label>
                <Select 
                  disabled={!isEditing}
                  value={rewardType} 
                  onChange={setRewardType}
                  className="w-full"
                  style={{ borderRadius: 8 }}
                  options={[
                    { value: 'AIR_CARGO', label: 'Air Cargo' },
                    { value: 'SEA_CARGO', label: 'Sea Cargo' },
                    { value: 'KG_SHIPMENT', label: 'KG Shipment' },
                  ]}
                />
              </div>

              {isEditing && (
                <>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Rule Name</label>
                    <Input 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      placeholder="e.g. Air Cargo Reward" 
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Description</label>
                    <Input.TextArea 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      placeholder="e.g. Unlock after 2 deliveries" 
                      rows={2}
                      style={{ borderRadius: 8 }}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Discount (%)</label>
                  <InputNumber 
                    disabled={!isEditing}
                    min={0} max={100} 
                    value={discountPercent} onChange={v => setDiscountPercent(v || 0)}
                    className="w-full" style={{ borderRadius: 8, height: 40, display: 'flex', alignItems: 'center' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Free KG Limit</label>
                  <InputNumber 
                    disabled={!isEditing}
                    min={0} 
                    value={freeKgLimit} onChange={v => setFreeKgLimit(v || 0)}
                    className="w-full" style={{ borderRadius: 8, height: 40, display: 'flex', alignItems: 'center' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Thresh. Count</label>
                  <InputNumber 
                    disabled={!isEditing}
                    min={0} 
                    value={thresholdCount} onChange={v => setThresholdCount(v || 0)}
                    className="w-full" style={{ borderRadius: 8, height: 40, display: 'flex', alignItems: 'center' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Thresh. Weight</label>
                  <InputNumber 
                    disabled={!isEditing}
                    min={0} 
                    value={thresholdWeight} onChange={v => setThresholdWeight(v || 0)}
                    className="w-full" style={{ borderRadius: 8, height: 40, display: 'flex', alignItems: 'center' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-slate-700">Activate Rule</span>
                <Switch 
                  checked={isActive} 
                  onChange={handleToggle} 
                  loading={isToggling}
                  className="bg-slate-300 [&.ant-switch-checked]:bg-blue-600" 
                />
              </div>

              {isEditing && (
                <div className="pt-2">
                  <Button 
                    type="primary" 
                    block 
                    size="large" 
                    loading={isSaving}
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700 h-11 font-bold"
                    style={{ borderRadius: 8 }}
                  >
                    Save Rule
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgramPage;
