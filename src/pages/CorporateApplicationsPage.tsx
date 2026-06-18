import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Space, Typography } from 'antd';
import { Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import { useGetCorporateApplicationsQuery, useReviewCorporateApplicationMutation } from '../redux/api/adminApi';

const { Text } = Typography;

const CorporateApplicationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCorporateApplicationsQuery({ page, limit: 10 });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewCorporateApplicationMutation();

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
          {natures?.map((n) => <Tag key={n} className="m-0">{n}</Tag>)}
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
      <Card title="Corporate Partner Applications">
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
        title="Corporate Application Details"
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
            <div><Text type="secondary">Legal Name:</Text> <Text strong className="block">{detailModal.companyName}</Text></div>
            <div><Text type="secondary">Trading Name:</Text> <Text strong className="block">{detailModal.tradingName}</Text></div>
            <div><Text type="secondary">Reg Number:</Text> <Text strong className="block">{detailModal.regNo}</Text></div>
            <div><Text type="secondary">Country:</Text> <Text strong className="block">{detailModal.country}</Text></div>
            <div className="col-span-2"><Text type="secondary">Address:</Text> <Text strong className="block">{detailModal.address}</Text></div>
            
            <div className="col-span-2 border-t pt-4 mt-2">
                <Text type="secondary" className="block mb-2 font-bold uppercase text-[10px]">Contact Person</Text>
                <div className="grid grid-cols-2 gap-4">
                    <div><Text type="secondary">Name:</Text> <Text strong className="block">{detailModal.contactName}</Text></div>
                    <div><Text type="secondary">Position:</Text> <Text strong className="block">{detailModal.contactPosition}</Text></div>
                    <div><Text type="secondary">Email:</Text> <Text strong className="block">{detailModal.contactEmail}</Text></div>
                    <div><Text type="secondary">Phone:</Text> <Text strong className="block">{detailModal.contactPhone}</Text></div>
                </div>
            </div>

            <div className="col-span-2 border-t pt-4">
                <Text type="secondary" className="block mb-2 font-bold uppercase text-[10px]">Business Logistics</Text>
                <div className="space-y-3">
                    <div><Text type="secondary">Website:</Text> <a href={detailModal.website} target="_blank" rel="noreferrer" className="text-blue-600 block">{detailModal.website}</a></div>
                    <div><Text type="secondary">Ship From:</Text> <Text strong className="block">{detailModal.countriesOperateFrom}</Text></div>
                    <div><Text type="secondary">Ship To:</Text> <Text strong className="block">{detailModal.countriesShipTo}</Text></div>
                    <div><Text type="secondary">Estimated Volume:</Text> <Text strong className="block">{detailModal.estimatedMonthlyVolume}</Text></div>
                    <div><Text type="secondary">Services Required:</Text> <Text strong className="block">{detailModal.servicesRequired}</Text></div>
                </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal
        title="Review Corporate Application"
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

export default CorporateApplicationsPage;
