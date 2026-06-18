import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Space, Typography } from 'antd';
import { Eye, ArrowUpCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useGetUpgradeApplicationsQuery, useReviewUpgradeApplicationMutation } from '../redux/api/adminApi';

const { Text } = Typography;

const UpgradeApplicationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUpgradeApplicationsQuery({ page, limit: 10 });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewUpgradeApplicationMutation();

  const [detailModal, setDetailModal] = useState<any>(null);
  const [reviewModal, setReviewModal] = useState<any>(null);
  const [form] = Form.useForm();

  const handleReview = async (values: any) => {
    try {
      const res = await reviewApplication({
        id: reviewModal.id,
        data: values,
      }).unwrap();
      if (res.success) {
        message.success('Upgrade application reviewed successfully!');
        setReviewModal(null);
        setDetailModal(null);
        form.resetFields();
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to review application');
    }
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div className="text-xs text-slate-400">{record.contactEmail}</div>
        </div>
      ),
    },
    {
      title: 'Current Tier',
      dataIndex: 'currentTier',
      key: 'currentTier',
      render: (tier: string) => <Tag color="blue">{tier || 'T1'}</Tag>,
    },
    {
      title: 'Target Tier',
      dataIndex: 'targetTier',
      key: 'targetTier',
      render: (tier: string) => (
        <Space>
          <ArrowUpCircle size={14} className="text-emerald-500" />
          <Tag color="emerald">{tier}</Tag>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'gold';
        if (status === 'Accepted') color = 'green';
        if (status === 'Rejected') color = 'red';
        return <Tag color={color}>{status?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<Eye size={16} />} 
            onClick={() => setDetailModal(record)}
          />
          {record.status === 'PENDING' && (
            <Button 
              type="primary" 
              size="small" 
              onClick={() => setReviewModal(record)}
            >
              Review
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card title="Tier Upgrade Applications">
        <Table
          dataSource={data?.data || []}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 10,
            total: data?.meta?.total || 0,
            onChange: (p) => setPage(p),
          }}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title="Upgrade Application Details"
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={[
          <Button key="close" onClick={() => setDetailModal(null)}>Close</Button>,
          detailModal?.status === 'PENDING' && (
            <Button key="review" type="primary" onClick={() => setReviewModal(detailModal)}>Review Application</Button>
          )
        ]}
        width={750}
      >
        {detailModal && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4">
            <div className="col-span-2 bg-blue-50 p-4 rounded-xl mb-2 flex justify-between items-center">
                <div>
                    <Text type="secondary" className="block text-[10px] uppercase font-bold">Target Tier Upgrade</Text>
                    <Text strong className="text-lg">Upgrade to {detailModal.targetTier}</Text>
                </div>
                <Tag color="blue" className="px-3 py-1 text-sm font-bold">Current: {detailModal.currentTier || 'T1'}</Tag>
            </div>

            <div><Text type="secondary">Company Name:</Text> <Text strong className="block">{detailModal.companyName}</Text></div>
            <div><Text type="secondary">Trading Name:</Text> <Text strong className="block">{detailModal.tradingName}</Text></div>
            <div><Text type="secondary">Reg Number:</Text> <Text strong className="block">{detailModal.regNo || detailModal.Reg_no}</Text></div>
            <div><Text type="secondary">Country:</Text> <Text strong className="block">{detailModal.country}</Text></div>
            
            <div className="col-span-2 border-t pt-4 mt-2">
                <Text type="secondary" className="block mb-2 font-bold uppercase text-[10px]">Contact Person</Text>
                <div className="grid grid-cols-2 gap-4">
                    <div><Text type="secondary">Name:</Text> <Text strong className="block">{detailModal.contactName || detailModal.autorizedPersonFullName}</Text></div>
                    <div><Text type="secondary">Position:</Text> <Text strong className="block">{detailModal.contactPosition || detailModal.authorizedPersonTitle}</Text></div>
                    <div><Text type="secondary">Email:</Text> <Text strong className="block">{detailModal.contactEmail || detailModal.email}</Text></div>
                    <div><Text type="secondary">Phone:</Text> <Text strong className="block">{detailModal.contactPhone || detailModal.phone}</Text></div>
                </div>
            </div>

            <div className="col-span-2 border-t pt-4">
                <Text type="secondary" className="block mb-2 font-bold uppercase text-[10px]">Logistics Capacity</Text>
                <div className="grid grid-cols-2 gap-4">
                    <div><Text type="secondary">Monthly Volume:</Text> <Text strong className="block">{detailModal.estimatedMonthlyVolume}</Text></div>
                    <div className="col-span-2"><Text type="secondary">Cargo Types:</Text> <div className="mt-1">{detailModal.cargoTypes?.map((c: string) => <Tag key={c}>{c}</Tag>)}</div></div>
                    <div className="col-span-2"><Text type="secondary">Business Nature:</Text> <div className="mt-1">{detailModal.businessNature?.map((b: string) => <Tag key={b}>{b}</Tag>)}</div></div>
                </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        title="Review Upgrade Application"
        open={!!reviewModal}
        onCancel={() => setReviewModal(null)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleReview}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <select className="w-full h-10 border rounded-md px-3">
              <option value="Accepted">Accept</option>
              <option value="Rejected">Reject</option>
            </select>
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} placeholder="Reason for acceptance/rejection..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block>
            Submit Review
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UpgradeApplicationsPage;
