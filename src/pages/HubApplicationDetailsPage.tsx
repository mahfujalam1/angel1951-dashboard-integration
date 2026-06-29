import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input, message, Select, Switch, InputNumber } from 'antd';
import { Shield, Pencil } from 'lucide-react';
import {
  useGetHubProviderApplicationByIdQuery,
  useReviewHubProviderApplicationMutation,
  useUpdateHubProviderApplicationMutation,
} from '../redux/api/adminApi';
import {
  APPLICATION_STATUS_OPTIONS,
  formatDetailBoolean,
  formatDetailDate,
  isAcceptedStatus,
  isPendingStatus,
  isRejectedStatus,
  normalizeStatus,
} from '../utils/applicationHelpers';
import {
  ApplicationLoading,
  ApplicationNotFound,
  ApplicationPageHeader,
  DetailField,
  DetailGrid,
  DetailSection,
  DetailTags,
} from '../components/applications/ApplicationView';

const HubApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appRes, isLoading, isError } = useGetHubProviderApplicationByIdQuery(id!, { skip: !id });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewHubProviderApplicationMutation();
  const [updateApplication, { isLoading: isUpdating }] = useUpdateHubProviderApplicationMutation();

  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const application = appRes?.data;

  const handleReview = async (values: { status: string; notes?: string }) => {
    try {
      const res = await reviewApplication({ id: id!, data: values }).unwrap();
      if (res.success) {
        message.success('Application reviewed successfully!');
        setReviewModal(false);
        form.resetFields();
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to review application');
    }
  };

  const openEditModal = () => {
    if (!application) return;
    editForm.setFieldsValue({
      shopName: application.shopName,
      address: application.address,
      landmark: application.landmark,
      cityOrState: application.cityOrState,
      contact: application.contact,
      email: application.email,
      cctvAvailable: application.cctvAvailable,
      ownerName: application.ownerName,
      ownerEmail: application.ownerEmail,
      prefferedContactMethod: application.prefferedContactMethod,
      operatingDays: application.operatingDays,
      email_active_window_from: application.email_active_window_from,
      email_active_window_to: application.email_active_window_to,
      daily_minimum_staff: application.daily_minimum_staff,
      daily_maximum_staff: application.daily_maximum_staff,
      daily_foot_traffic: application.daily_foot_traffic,
      handledDeliveryServiceBefore: application.handledDeliveryServiceBefore,
      atLeastSixMonthCommitted: application.atLeastSixMonthCommitted,
      comments: application.comments,
      status: normalizeStatus(application.status),
      rejection_notes: application.rejection_notes || application.notes,
    });
    setEditModal(true);
  };

  const handleUpdate = async (values: any) => {
    try {
      const res = await updateApplication({ id: id!, data: values }).unwrap();
      if (res.success) {
        message.success('Application updated successfully!');
        setEditModal(false);
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to update application');
    }
  };

  if (isLoading) return <ApplicationLoading />;
  if (isError || !application) return <ApplicationNotFound onBack={() => navigate(-1)} />;

  const displayStatus = normalizeStatus(application.status);
  const rejectionNotes = application.rejection_notes || application.notes;

  return (
    <div className="space-y-6">
      <ApplicationPageHeader
        title="View Application"
        subtitle={`Hub Provider · ${application.shopName || 'Application'}`}
        status={application.status}
        onBack={() => navigate(-1)}
        actions={
          <>
            {isPendingStatus(application.status) && (
              <Button type="primary" size="large" onClick={() => setReviewModal(true)}>
                Review Application
              </Button>
            )}
            <Button icon={<Pencil size={16} />} size="large" onClick={openEditModal}>
              Edit Application
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <DetailSection title="Shop Information">
            <DetailGrid>
              <DetailField label="Shop Name" value={application.shopName} />
              <DetailField label="City / State" value={application.cityOrState} />
              <DetailField label="Address" value={application.address} fullWidth />
              <DetailField label="Landmark" value={application.landmark} fullWidth />
              <DetailField label="Contact Phone" value={application.contact} />
              <DetailField label="Shop Email" value={application.email} />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Owner Details">
            <DetailGrid>
              <DetailField label="Owner Name" value={application.ownerName} />
              <DetailField label="Owner Email" value={application.ownerEmail} />
              <DetailField label="Preferred Contact Method" value={application.prefferedContactMethod} />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Operational Details">
            <DetailGrid>
              <DetailField label="Operating Days" value={<DetailTags items={application.operatingDays} />} fullWidth />
              <DetailField label="Daily Min Staff" value={application.daily_minimum_staff} />
              <DetailField label="Daily Max Staff" value={application.daily_maximum_staff} />
              <DetailField label="Daily Foot Traffic" value={application.daily_foot_traffic} />
              <DetailField label="CCTV Available" value={formatDetailBoolean(application.cctvAvailable)} />
              <DetailField label="Handled Delivery Before" value={formatDetailBoolean(application.handledDeliveryServiceBefore)} />
              <DetailField label="6-Month Commitment" value={formatDetailBoolean(application.atLeastSixMonthCommitted)} />
              <DetailField label="Email Active Window From" value={formatDetailDate(application.email_active_window_from)} />
              <DetailField label="Email Active Window To" value={formatDetailDate(application.email_active_window_to)} />
              <DetailField label="Comments" value={application.comments} fullWidth />
            </DetailGrid>
          </DetailSection>

          {application.image_urls?.length > 0 && (
            <DetailSection title="Shop Images">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {application.image_urls.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="block rounded-xl overflow-hidden border border-slate-100">
                    <img src={url} alt={`Shop ${i + 1}`} className="w-full h-32 object-cover" />
                  </a>
                ))}
              </div>
            </DetailSection>
          )}
        </div>

        <div className="space-y-6">
          <DetailSection title="Application Status">
            <DetailGrid>
              <DetailField label="Status" value={displayStatus} />
              <DetailField label="Submitted" value={formatDetailDate(application.createdAt)} />
              <DetailField label="Last Updated" value={formatDetailDate(application.updatedAt)} />
              <DetailField label="Rejection Notes" value={rejectionNotes} fullWidth />
            </DetailGrid>
          </DetailSection>

          {!isPendingStatus(application.status) && (
            <div
              className={`rounded-2xl border p-5 ${
                isAcceptedStatus(application.status)
                  ? 'bg-emerald-50 border-emerald-100'
                  : isRejectedStatus(application.status)
                    ? 'bg-red-50 border-red-100'
                    : 'bg-slate-50 border-slate-100'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Decision</p>
              <p className="text-lg font-bold text-slate-800">{displayStatus}</p>
              {rejectionNotes && (
                <p className="mt-3 text-sm text-slate-600 italic">{rejectionNotes}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        title={<div className="flex items-center gap-2"><Shield size={18} className="text-blue-600" /> Review Application</div>}
        open={reviewModal}
        onCancel={() => setReviewModal(false)}
        footer={null}
        centered
        width={420}
      >
        <Form form={form} layout="vertical" onFinish={handleReview} initialValues={{ status: 'Accepted' }}>
          <Form.Item name="status" label="Decision" rules={[{ required: true }]}>
            <Select options={APPLICATION_STATUS_OPTIONS.filter((o) => o.value !== 'Pending')} />
          </Form.Item>
          <Form.Item name="notes" label="Review Notes">
            <Input.TextArea rows={4} placeholder="Internal notes or reason for rejection..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block size="large">
            Submit Review
          </Button>
        </Form>
      </Modal>

      <Modal title="Edit Hub Application" open={editModal} onCancel={() => setEditModal(false)} footer={null} centered width={640}>
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="shopName" label="Shop Name" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="status" label="Status"><Select options={APPLICATION_STATUS_OPTIONS} /></Form.Item>
            <Form.Item name="cityOrState" label="City / State"><Input /></Form.Item>
            <Form.Item name="address" label="Address" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="landmark" label="Landmark" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="contact" label="Contact Phone"><Input /></Form.Item>
            <Form.Item name="email" label="Shop Email"><Input /></Form.Item>
            <Form.Item name="ownerName" label="Owner Name"><Input /></Form.Item>
            <Form.Item name="ownerEmail" label="Owner Email"><Input /></Form.Item>
            <Form.Item name="prefferedContactMethod" label="Preferred Contact Method"><Input /></Form.Item>
            <Form.Item name="daily_minimum_staff" label="Min Daily Staff"><InputNumber className="w-full" min={0} /></Form.Item>
            <Form.Item name="daily_maximum_staff" label="Max Daily Staff"><InputNumber className="w-full" min={0} /></Form.Item>
            <Form.Item name="daily_foot_traffic" label="Daily Foot Traffic" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="operatingDays" label="Operating Days" className="md:col-span-2"><Select mode="tags" /></Form.Item>
            <Form.Item name="cctvAvailable" label="CCTV Available" valuePropName="checked"><Switch /></Form.Item>
            <Form.Item name="handledDeliveryServiceBefore" label="Handled Delivery Before" valuePropName="checked"><Switch /></Form.Item>
            <Form.Item name="atLeastSixMonthCommitted" label="6-Month Commitment" valuePropName="checked"><Switch /></Form.Item>
            <Form.Item name="comments" label="Comments" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="rejection_notes" label="Rejection Notes" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
          </div>
          <Button type="primary" htmlType="submit" loading={isUpdating} block size="large">Save Changes</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default HubApplicationDetailsPage;
