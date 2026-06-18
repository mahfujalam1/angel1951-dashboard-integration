import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Typography, Space, Modal, Form, Input, message, Skeleton, Divider } from 'antd';
import { ChevronLeft, CheckCircle, XCircle, Clock, Mail, Phone, User, Shield, ArrowUpCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useGetUpgradeApplicationsQuery, useReviewUpgradeApplicationMutation } from '../redux/api/adminApi';

const { Title, Text } = Typography;

const UpgradeApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appsRes, isLoading } = useGetUpgradeApplicationsQuery({});
  const [reviewApplication, { isLoading: isReviewing }] = useReviewUpgradeApplicationMutation();

  const [reviewModal, setReviewModal] = useState(false);
  const [form] = Form.useForm();

  const application = appsRes?.data?.find((app: any) => app.id === id);

  const handleReview = async (values: any) => {
    try {
      const res = await reviewApplication({
        id: id!,
        data: values,
      }).unwrap();
      if (res.success) {
        message.success('Upgrade application reviewed successfully!');
        setReviewModal(false);
        form.resetFields();
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to review application');
    }
  };

  if (isLoading) return <div className="p-8 text-center"><Skeleton active /></div>;
  if (!application) return <div className="p-8 text-center"><Title level={4}>Application not found</Title><Button onClick={() => navigate(-1)}>Go Back</Button></div>;

  const statusColor = application.status === 'Accepted' ? 'green' : application.status === 'Rejected' ? 'red' : 'gold';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Space size="middle">
          <Button icon={<ChevronLeft size={16} />} onClick={() => navigate(-1)}>Back</Button>
          <Title level={4} style={{ margin: 0, fontFamily: 'Sora, sans-serif' }}>Tier Upgrade Request</Title>
          <Tag color={statusColor} className="px-3 py-1 font-bold uppercase">{application.status}</Tag>
        </Space>
        {application.status === 'PENDING' && (
          <Button type="primary" size="large" onClick={() => setReviewModal(true)}>Review Request</Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
             <div className="relative z-10">
                <Text className="text-blue-100 text-xs font-bold uppercase tracking-widest block mb-2">Requesting Upgrade to</Text>
                <Title level={1} className="text-white m-0" style={{ color: 'white', fontFamily: 'Sora, sans-serif' }}>{application.targetTier}</Title>
                <div className="flex items-center gap-3 mt-6">
                   <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-xl text-sm font-bold border border-white/20">
                      Current: {application.currentTier || 'T1'}
                   </div>
                   <ArrowUpCircle size={24} className="text-emerald-400" />
                   <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20">
                      New Level: {application.targetTier}
                   </div>
                </div>
             </div>
             <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 opacity-10">
                <ArrowUpCircle size={300} />
             </div>
          </div>

          <Card title="Business Identity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-2">
              <div>
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Company Legal Name</Text>
                <Text strong className="text-base block">{application.companyName}</Text>
                <Text className="text-xs text-slate-400 italic">Trading as: {application.tradingName}</Text>
              </div>
              <div>
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Registration</Text>
                <Text strong className="text-base block">{application.regNo || application.Reg_no}</Text>
                <Text className="text-xs text-slate-400">{application.country}</Text>
              </div>
              <div className="col-span-2">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Registered Address</Text>
                <Text strong className="text-base block">{application.address}</Text>
              </div>
            </div>
            
            <Divider />
            
            <Title level={5} className="mb-4">Operational Capacity</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Text type="secondary" className="text-[10px] uppercase font-bold block mb-2 text-slate-400">Monthly Shipment Volume</Text>
                  <Text strong className="text-lg text-slate-700">{application.estimatedMonthlyVolume}</Text>
               </div>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <Text type="secondary" className="text-[10px] uppercase font-bold block mb-2 text-slate-400">Business Operation Mode</Text>
                  <Text strong className="text-lg text-slate-700">{application.operation_mode || 'Online/Hybrid'}</Text>
               </div>
               <div className="col-span-2">
                  <Text type="secondary" className="text-[10px] uppercase font-bold block mb-2">Business Nature & Cargo Types</Text>
                  <div className="flex gap-2 flex-wrap">
                    {application.businessNature?.map((b: string) => <Tag key={b} color="purple">{b}</Tag>)}
                    {application.cargoTypes?.map((c: string) => <Tag key={c} color="blue">{c}</Tag>)}
                  </div>
               </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Authorized Person">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">{application.authorizedPersonTitle || 'Full Name'}</Text>
                  <Text strong className="text-lg">{application.autorizedPersonFullName || application.contactName}</Text>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <Text className="text-sm">{application.email || application.contactEmail}</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400" />
                  <Text className="text-sm">{application.phone || application.contactPhone}</Text>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Review Log">
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <Clock size={14} />
                   </div>
                   <div>
                      <Text className="text-xs font-bold block">Application Received</Text>
                      <Text className="text-[10px] text-slate-400">{new Date(application.createdAt).toLocaleString()}</Text>
                   </div>
                </div>
                {application.status !== 'PENDING' && (
                   <div className="flex gap-3 pt-4 border-t border-slate-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${application.status === 'Accepted' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                         {application.status === 'Accepted' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      </div>
                      <div>
                         <Text className="text-xs font-bold block">Final Decision Made</Text>
                         <Text className={`text-[10px] font-bold ${application.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>{application.status?.toUpperCase()}</Text>
                         {application.notes && <div className="mt-2 text-xs italic text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">{application.notes}</div>}
                      </div>
                   </div>
                )}
             </div>
          </Card>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        title={<div className="flex items-center gap-2 text-slate-800"><Shield size={18} className="text-blue-600" /> Decision Panel</div>}
        open={reviewModal}
        onCancel={() => setReviewModal(false)}
        footer={null}
        centered
        width={420}
      >
        <Form form={form} layout="vertical" onFinish={handleReview} initialValues={{ status: 'Accepted' }}>
          <Form.Item name="status" label="Upgrade Decision" rules={[{ required: true }]}>
            <select className="w-full h-12 border-slate-200 rounded-2xl px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm">
              <option value="Accepted">Approve Tier Upgrade</option>
              <option value="Rejected">Decline Tier Upgrade</option>
            </select>
          </Form.Item>
          <Form.Item name="notes" label="Decision Notes">
            <Input.TextArea rows={4} placeholder="Explain the reason for this decision..." style={{ borderRadius: 16 }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block size="large" style={{ height: 52, borderRadius: 16, background: '#2563eb' }}>
            Confirm Decision
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UpgradeApplicationDetailsPage;
