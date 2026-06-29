import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input, message, Select } from 'antd';
import { Shield, Pencil } from 'lucide-react';
import {
  useGetCorporateApplicationByIdQuery,
  useReviewCorporateApplicationMutation,
  useUpdateCorporateApplicationMutation,
} from '../redux/api/adminApi';
import {
  APPLICATION_STATUS_OPTIONS,
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
  DetailLink,
  DetailSection,
  DetailTags,
} from '../components/applications/ApplicationView';

const CorporateApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appRes, isLoading, isError } = useGetCorporateApplicationByIdQuery(id!, { skip: !id });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewCorporateApplicationMutation();
  const [updateApplication, { isLoading: isUpdating }] = useUpdateCorporateApplicationMutation();

  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const application = appRes?.data;

  const handleReview = async (values: { status: string; notes?: string }) => {
    try {
      const res = await reviewApplication({ id: id!, data: values }).unwrap();
      if (res.success) {
        message.success('Corporate application reviewed successfully!');
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
      companyName: application.companyName,
      tradingName: application.tradingName,
      regNo: application.regNo,
      country: application.country,
      address: application.address,
      yearsInOperation: application.yearsInOperation,
      contactName: application.contactName,
      contactPosition: application.contactPosition,
      contactPhone: application.contactPhone,
      contactEmail: application.contactEmail,
      website: application.website,
      businessNature: application.businessNature,
      countriesOperateFrom: application.countriesOperateFrom,
      countriesShipTo: application.countriesShipTo,
      cargoTypes: application.cargoTypes,
      estimatedMonthlyVolume: application.estimatedMonthlyVolume,
      servicesRequired: application.servicesRequired,
      status: normalizeStatus(application.status),
      rejectionNotes: application.rejectionNotes || application.notes,
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
  const rejectionNotes = application.rejectionNotes || application.notes;

  return (
    <div className="space-y-6">
      <ApplicationPageHeader
        title="View Application"
        subtitle={`Corporate Partner · ${application.companyName || 'Application'}`}
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
          <DetailSection title="Company Information">
            <DetailGrid>
              <DetailField label="Company Name" value={application.companyName} />
              <DetailField label="Trading Name" value={application.tradingName} />
              <DetailField label="Registration No." value={application.regNo} />
              <DetailField label="Country" value={application.country} />
              <DetailField label="Years in Operation" value={application.yearsInOperation} />
              <DetailField label="Website" value={<DetailLink href={application.website} />} />
              <DetailField label="Address" value={application.address} fullWidth />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Contact Person">
            <DetailGrid>
              <DetailField label="Contact Name" value={application.contactName} />
              <DetailField label="Contact Position" value={application.contactPosition} />
              <DetailField label="Contact Email" value={application.contactEmail} />
              <DetailField label="Contact Phone" value={application.contactPhone} />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Business & Logistics">
            <DetailGrid>
              <DetailField label="Business Nature" value={<DetailTags items={application.businessNature} />} fullWidth />
              <DetailField label="Countries Operate From" value={application.countriesOperateFrom} />
              <DetailField label="Countries Ship To" value={application.countriesShipTo} />
              <DetailField label="Estimated Monthly Volume" value={application.estimatedMonthlyVolume} />
              <DetailField label="Cargo Types" value={<DetailTags items={application.cargoTypes} />} fullWidth />
              <DetailField label="Services Required" value={application.servicesRequired} fullWidth />
            </DetailGrid>
          </DetailSection>
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
          <Form.Item name="notes" label="Internal Notes">
            <Input.TextArea rows={4} placeholder="Note for rejection or approval details..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block size="large">
            Confirm Review
          </Button>
        </Form>
      </Modal>

      <Modal title="Edit Corporate Application" open={editModal} onCancel={() => setEditModal(false)} footer={null} centered width={640}>
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="companyName" label="Company Name" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="status" label="Status"><Select options={APPLICATION_STATUS_OPTIONS} /></Form.Item>
            <Form.Item name="tradingName" label="Trading Name"><Input /></Form.Item>
            <Form.Item name="regNo" label="Registration No"><Input /></Form.Item>
            <Form.Item name="country" label="Country"><Input /></Form.Item>
            <Form.Item name="yearsInOperation" label="Years in Operation"><Input /></Form.Item>
            <Form.Item name="address" label="Address" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="website" label="Website" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="contactName" label="Contact Name"><Input /></Form.Item>
            <Form.Item name="contactPosition" label="Contact Position"><Input /></Form.Item>
            <Form.Item name="contactEmail" label="Contact Email"><Input /></Form.Item>
            <Form.Item name="contactPhone" label="Contact Phone"><Input /></Form.Item>
            <Form.Item name="estimatedMonthlyVolume" label="Estimated Monthly Volume"><Input /></Form.Item>
            <Form.Item name="businessNature" label="Business Nature"><Select mode="tags" /></Form.Item>
            <Form.Item name="cargoTypes" label="Cargo Types"><Select mode="tags" /></Form.Item>
            <Form.Item name="countriesOperateFrom" label="Countries Operate From" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="countriesShipTo" label="Countries Ship To" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="servicesRequired" label="Services Required" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="rejectionNotes" label="Rejection Notes" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
          </div>
          <Button type="primary" htmlType="submit" loading={isUpdating} block size="large">Save Changes</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CorporateApplicationDetailsPage;
