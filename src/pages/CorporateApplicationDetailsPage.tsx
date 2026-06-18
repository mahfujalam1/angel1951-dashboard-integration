import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Typography, Space, Modal, Form, Input, message, Skeleton, Divider } from 'antd';
import { ChevronLeft, CheckCircle, XCircle, Clock, Mail, Phone, User, Building, Shield, Globe, Briefcase } from 'lucide-react';
import Card from '../components/ui/Card';
import { useGetCorporateApplicationsQuery, useReviewCorporateApplicationMutation } from '../redux/api/adminApi';

const { Title, Text } = Typography;

const CorporateApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appsRes, isLoading } = useGetCorporateApplicationsQuery({});
  const [reviewApplication, { isLoading: isReviewing }] = useReviewCorporateApplicationMutation();

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
        message.success('Corporate application reviewed successfully!');
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
          <Title level={4} style={{ margin: 0, fontFamily: 'Sora, sans-serif' }}>Corporate Application: {application.companyName}</Title>
          <Tag color={statusColor} className="px-3 py-1 font-bold uppercase">{application.status}</Tag>
        </Space>
        {application.status === 'PENDING' && (
          <Button type="primary" size="large" onClick={() => setReviewModal(true)}>Review Application</Button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card title="Company Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building size={20} />
                </div>
                <div>
                  <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Legal Entity</Text>
                  <Text strong className="text-base">{application.companyName}</Text>
                  <div className="text-xs text-slate-400">Trading as: {application.tradingName}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                  <Briefcase size={20} />
                </div>
                <div>
                  <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Registration</Text>
                  <Text strong className="text-base">{application.regNo}</Text>
                  <div className="text-xs text-slate-400">Country: {application.country}</div>
                </div>
              </div>
              <div className="flex gap-4 col-span-2">
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Business Nature</Text>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {application.businessNature?.map((n: string) => <Tag key={n} color="blue">{n}</Tag>)}
                  </div>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <Title level={5} className="mb-4">Logistics & Supply Chain</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 p-2">
              <div>
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Shipping Routes</Text>
                <div className="space-y-1">
                  <Text className="text-xs block">From: <Text strong>{application.countriesOperateFrom}</Text></Text>
                  <Text className="text-xs block">To: <Text strong>{application.countriesShipTo}</Text></Text>
                </div>
              </div>
              <div>
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Cargo & Volume</Text>
                <div className="space-y-1">
                  <Text className="text-xs block">Vol: <Text strong>{application.estimatedMonthlyVolume}</Text></Text>
                  <Text className="text-xs block">Cargo: <Text strong>{application.cargoTypes?.join(', ')}</Text></Text>
                </div>
              </div>
              <div className="col-span-2">
                <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">Services Required</Text>
                <Text className="text-sm">{application.servicesRequired}</Text>
              </div>
            </div>
          </Card>

          <Card title="Company Website">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <a href={application.website} target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-2">
                  <Globe size={16} /> {application.website}
                </a>
             </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Contact Person">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <Text type="secondary" className="text-[10px] uppercase font-bold tracking-wider block mb-1">{application.contactPosition || 'Authorized Person'}</Text>
                  <Text strong className="text-lg">{application.contactName}</Text>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <Text className="text-sm">{application.contactEmail}</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400" />
                  <Text className="text-sm">{application.contactPhone}</Text>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Review Actions">
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                      <Clock size={14} />
                   </div>
                   <div>
                      <Text className="text-xs font-bold block">Application Submitted</Text>
                      <Text className="text-[10px] text-slate-400">{new Date(application.createdAt).toLocaleString()}</Text>
                   </div>
                </div>
                {application.status !== 'PENDING' && (
                   <div className="flex gap-3 pt-4 border-t border-slate-50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${application.status === 'Accepted' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                         {application.status === 'Accepted' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      </div>
                      <div>
                         <Text className="text-xs font-bold block">Application Reviewed</Text>
                         <Text className="text-[10px] text-slate-400">Status: {application.status}</Text>
                         {application.notes && <div className="mt-2 text-xs italic text-slate-500 bg-slate-50 p-2 rounded">Note: {application.notes}</div>}
                      </div>
                   </div>
                )}
             </div>
          </Card>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        title={<div className="flex items-center gap-2"><Shield size={18} className="text-blue-600" /> Review Application</div>}
        open={reviewModal}
        onCancel={() => setReviewModal(false)}
        footer={null}
        centered
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleReview} initialValues={{ status: 'Accepted' }}>
          <Form.Item name="status" label="Decision" rules={[{ required: true }]}>
            <select className="w-full h-11 border-slate-200 rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option value="Accepted">Accept Partner</option>
              <option value="Rejected">Reject Partner</option>
            </select>
          </Form.Item>
          <Form.Item name="notes" label="Internal Notes">
            <Input.TextArea rows={4} placeholder="Note for rejection or approval details..." style={{ borderRadius: 12 }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block size="large" style={{ height: 48, borderRadius: 12 }}>
            Confirm Review
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CorporateApplicationDetailsPage;
