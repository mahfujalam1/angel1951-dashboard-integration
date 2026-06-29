import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Button, Modal, Form, Input, Select, message, Space, Typography } from 'antd';
import { Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import {
  useGetHubProviderApplicationsQuery,
  useReviewHubProviderApplicationMutation,
} from '../redux/api/adminApi';
import {
  APPLICATION_STATUS_OPTIONS,
  getPaginatedList,
  getStatusTagColor,
  isPendingStatus,
  normalizeStatus,
} from '../utils/applicationHelpers';

const { Text } = Typography;

const HubApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetHubProviderApplicationsQuery({ page, limit: 10 });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewHubProviderApplicationMutation();

  const [reviewModal, setReviewModal] = useState<any>(null);
  const [form] = Form.useForm();

  const { list, total } = getPaginatedList(data);

  const handleReview = async (values: { status: string; notes?: string }) => {
    try {
      const res = await reviewApplication({
        id: reviewModal.id,
        data: values,
      }).unwrap();
      if (res.success) {
        message.success('Application reviewed successfully!');
        setReviewModal(null);
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
      render: (status: string) => (
        <Tag color={getStatusTagColor(status)}>{normalizeStatus(status)}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => navigate(`/hub-applications/${record.id}`)}
          />
          {isPendingStatus(record.status) && (
            <Button type="primary" size="small" onClick={() => setReviewModal(record)}>
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
        {isError && (
          <div className="mb-4 text-sm text-red-500">Failed to load hub provider applications.</div>
        )}
        <Table
          dataSource={list}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 10,
            total,
            onChange: (p) => setPage(p),
          }}
        />
      </Card>

      <Modal
        title="Review Application"
        open={!!reviewModal}
        onCancel={() => {
          setReviewModal(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleReview} initialValues={{ status: 'Accepted' }}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select options={APPLICATION_STATUS_OPTIONS.filter((o) => o.value !== 'Pending')} />
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
