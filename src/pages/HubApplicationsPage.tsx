import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Space, Typography } from 'antd';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import { useGetHubProviderApplicationsQuery, useReviewHubProviderApplicationMutation } from '../redux/api/adminApi';

const { Text } = Typography;

const HubApplicationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetHubProviderApplicationsQuery({ page, limit: 10 });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewHubProviderApplicationMutation();

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
        message.success('Application reviewed successfully!');
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
      title: 'Shop Name',
      dataIndex: 'shopName',
      key: 'shopName',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          <div className="text-xs text-slate-400">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Location',
      dataIndex: 'cityOrState',
      key: 'cityOrState',
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
      <Card title="Hub Provider Applications">
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
        title="Application Details"
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={[
          <Button key="close" onClick={() => setDetailModal(null)}>Close</Button>,
          detailModal?.status === 'PENDING' && (
            <Button key="review" type="primary" onClick={() => setReviewModal(detailModal)}>Review Application</Button>
          )
        ]}
        width={700}
      >
        {detailModal && (
          <div className="grid grid-cols-2 gap-4 py-4">
            <div><Text type="secondary">Shop Name:</Text> <Text strong>{detailModal.shopName}</Text></div>
            <div><Text type="secondary">Owner Name:</Text> <Text strong>{detailModal.ownerName}</Text></div>
            <div><Text type="secondary">Email:</Text> <Text strong>{detailModal.email}</Text></div>
            <div><Text type="secondary">Phone:</Text> <Text strong>{detailModal.contact}</Text></div>
            <div><Text type="secondary">Address:</Text> <Text strong>{detailModal.address}</Text></div>
            <div><Text type="secondary">Landmark:</Text> <Text strong>{detailModal.landmark}</Text></div>
            <div><Text type="secondary">City/State:</Text> <Text strong>{detailModal.cityOrState}</Text></div>
            <div><Text type="secondary">CCTV:</Text> <Tag>{detailModal.cctvAvailable ? 'YES' : 'NO'}</Tag></div>
            <div className="col-span-2">
                <Text type="secondary">Operating Days:</Text> 
                <div className="mt-1 flex gap-1 flex-wrap">
                    {detailModal.operatingDays?.map((d: string) => <Tag key={d}>{d}</Tag>)}
                </div>
            </div>
            <div className="col-span-2">
                <Text type="secondary">Comments:</Text>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">{detailModal.comments || 'No comments'}</div>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        title="Review Application"
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

export default HubApplicationsPage;
