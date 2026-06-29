import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Button, Modal, Form, Input, Select, message, Space, Typography } from 'antd';
import { Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import {
  useGetCorporateApplicationsQuery,
  useReviewCorporateApplicationMutation,
} from '../redux/api/adminApi';
import {
  APPLICATION_STATUS_OPTIONS,
  getPaginatedList,
  getStatusTagColor,
  isPendingStatus,
  normalizeStatus,
} from '../utils/applicationHelpers';

const { Text } = Typography;

const CorporateApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetCorporateApplicationsQuery({ page, limit: 10 });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewCorporateApplicationMutation();

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
      title: 'Contact Person',
      dataIndex: 'contactName',
      key: 'contactName',
    },
    {
      title: 'Business Nature',
      dataIndex: 'businessNature',
      key: 'businessNature',
      render: (natures: string[]) => (
        <Space size={[0, 4]} wrap>
          {natures?.map((n) => (
            <Tag key={n} className="m-0">
              {n}
            </Tag>
          ))}
        </Space>
      ),
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
            onClick={() => navigate(`/corporate-applications/${record.id}`)}
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
      <Card title="Corporate Partner Applications">
        {isError && (
          <div className="mb-4 text-sm text-red-500">Failed to load corporate applications.</div>
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
        title="Review Corporate Application"
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

export default CorporateApplicationsPage;
