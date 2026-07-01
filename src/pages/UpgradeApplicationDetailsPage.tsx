import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input, message, Select } from 'antd';
import { Shield, Pencil, ArrowUpCircle } from 'lucide-react';
import {
  useGetUpgradeApplicationByIdQuery,
  useReviewUpgradeApplicationMutation,
  useUpdateUpgradeApplicationMutation,
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

const UpgradeApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: appRes, isLoading, isError } = useGetUpgradeApplicationByIdQuery(id!, { skip: !id });
  const [reviewApplication, { isLoading: isReviewing }] = useReviewUpgradeApplicationMutation();
  const [updateApplication, { isLoading: isUpdating }] = useUpdateUpgradeApplicationMutation();

  const [reviewModal, setReviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const application = appRes?.data;

  const handleReview = async (values: { status: string; notes?: string }) => {
    try {
      const res = await reviewApplication({ id: id!, data: values }).unwrap();
      if (res.success) {
        message.success('Upgrade application reviewed successfully!');
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
      targetTier: application.targetTier,
      companyName: application.companyName,
      tradingName: application.tradingName,
      Reg_no: application.regNo || application.Reg_no,
      country: application.country,
      address: application.address,
      email: application.email || application.contactEmail,
      phone: application.phone || application.contactPhone,
      website: application.website,
      type: application.type,
      operation_mode: application.operation_mode,
      yearsInOperation: application.yearsInOperation,
      contactName: application.contactName,
      contactPosition: application.contactPosition,
      contactPhone: application.contactPhone,
      contactEmail: application.contactEmail,
      autorizedPersonFullName: application.autorizedPersonFullName,
      authorizedPersonTitle: application.authorizedPersonTitle,
      businessNature: application.businessNature,
      countriesOperateFrom: application.countriesOperateFrom,
      countriesShipTo: application.countriesShipTo,
      cargoTypes: application.cargoTypes,
      estimatedMonthlyVolume: application.estimatedMonthlyVolume,
      servicesRequired: application.servicesRequired,
      status: normalizeStatus(application.status),
      notes: application.notes,
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

  return (
    <div className="space-y-6">
      <ApplicationPageHeader
        title="View Application"
        subtitle={`Tier Upgrade · ${application.companyName || 'Application'}`}
        status={application.status}
        onBack={() => navigate(-1)}
        actions={
          <>
            {isPendingStatus(application.status) && (
              <Button type="primary" size="large" onClick={() => setReviewModal(true)}>
                Review Request
              </Button>
            )}
            <Button icon={<Pencil size={16} />} size="large" onClick={openEditModal}>
              Edit Application
            </Button>
          </>
        }
      />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 rounded shadow-md text-white">
        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Tier Upgrade Request</p>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">Current Tier</p>
            <p className="text-2xl font-bold">{application.currentTier || 'T1'}</p>
          </div>
          <ArrowUpCircle size={28} className="text-emerald-300 shrink-0" />
          <div>
            <p className="text-blue-200 text-sm mb-1">Target Tier</p>
            <p className="text-2xl font-bold">{application.targetTier || '—'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <DetailSection title="Company Information">
            <DetailGrid>
              <DetailField label="Company Name" value={application.companyName} />
              <DetailField label="Trading Name" value={application.tradingName} />
              <DetailField label="Registration No." value={application.regNo || application.Reg_no} />
              <DetailField label="Country" value={application.country} />
              <DetailField label="Business Type" value={application.type} />
              <DetailField label="Years in Operation" value={application.yearsInOperation} />
              <DetailField label="Address" value={application.address} fullWidth />
              <DetailField label="Website" value={<DetailLink href={application.website} />} fullWidth />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Authorized Person & Contact">
            <DetailGrid>
              <DetailField label="Authorized Person" value={application.autorizedPersonFullName} />
              <DetailField label="Authorized Person Title" value={application.authorizedPersonTitle} />
              <DetailField label="Contact Name" value={application.contactName} />
              <DetailField label="Contact Position" value={application.contactPosition} />
              <DetailField label="Email" value={application.email || application.contactEmail} />
              <DetailField label="Phone" value={application.phone || application.contactPhone} />
              <DetailField label="Contact Email" value={application.contactEmail} />
              <DetailField label="Contact Phone" value={application.contactPhone} />
            </DetailGrid>
          </DetailSection>

          <DetailSection title="Business Operations">
            <DetailGrid>
              <DetailField label="Operation Mode" value={application.operation_mode} />
              <DetailField label="Estimated Monthly Volume" value={application.estimatedMonthlyVolume} />
              <DetailField label="Countries Operate From" value={application.countriesOperateFrom} />
              <DetailField label="Countries Ship To" value={application.countriesShipTo} />
              <DetailField label="Business Nature" value={<DetailTags items={application.businessNature} />} fullWidth />
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
              <DetailField label="Notes" value={application.notes} fullWidth />
            </DetailGrid>
          </DetailSection>

          {!isPendingStatus(application.status) && (
            <div
              className={`rounded border p-5 ${
                isAcceptedStatus(application.status)
                  ? 'bg-emerald-50 border-emerald-100'
                  : isRejectedStatus(application.status)
                    ? 'bg-red-50 border-red-100'
                    : 'bg-slate-50 border-slate-100'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Decision</p>
              <p className="text-lg font-bold text-slate-800">{displayStatus}</p>
              {application.notes && (
                <p className="mt-3 text-sm text-slate-600 italic">{application.notes}</p>
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
          <Form.Item name="notes" label="Decision Notes">
            <Input.TextArea rows={4} placeholder="Explain the reason for this decision..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isReviewing} block size="large">
            Confirm Decision
          </Button>
        </Form>
      </Modal>

      <Modal title="Edit Upgrade Application" open={editModal} onCancel={() => setEditModal(false)} footer={null} centered width={640}>
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Form.Item name="targetTier" label="Target Tier"><Input /></Form.Item>
            <Form.Item name="status" label="Status"><Select options={APPLICATION_STATUS_OPTIONS} /></Form.Item>
            <Form.Item name="companyName" label="Company Name" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="tradingName" label="Trading Name"><Input /></Form.Item>
            <Form.Item name="Reg_no" label="Registration No"><Input /></Form.Item>
            <Form.Item name="country" label="Country"><Input /></Form.Item>
            <Form.Item name="type" label="Business Type"><Input /></Form.Item>
            <Form.Item name="address" label="Address" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="email" label="Email"><Input /></Form.Item>
            <Form.Item name="phone" label="Phone"><Input /></Form.Item>
            <Form.Item name="website" label="Website"><Input /></Form.Item>
            <Form.Item name="yearsInOperation" label="Years in Operation"><Input /></Form.Item>
            <Form.Item name="autorizedPersonFullName" label="Authorized Person"><Input /></Form.Item>
            <Form.Item name="authorizedPersonTitle" label="Authorized Person Title"><Input /></Form.Item>
            <Form.Item name="contactName" label="Contact Name"><Input /></Form.Item>
            <Form.Item name="contactPosition" label="Contact Position"><Input /></Form.Item>
            <Form.Item name="contactEmail" label="Contact Email"><Input /></Form.Item>
            <Form.Item name="contactPhone" label="Contact Phone"><Input /></Form.Item>
            <Form.Item name="operation_mode" label="Operation Mode"><Input /></Form.Item>
            <Form.Item name="estimatedMonthlyVolume" label="Estimated Monthly Volume"><Input /></Form.Item>
            <Form.Item name="businessNature" label="Business Nature"><Select mode="tags" /></Form.Item>
            <Form.Item name="cargoTypes" label="Cargo Types"><Select mode="tags" /></Form.Item>
            <Form.Item name="countriesOperateFrom" label="Countries Operate From" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="countriesShipTo" label="Countries Ship To" className="md:col-span-2"><Input /></Form.Item>
            <Form.Item name="servicesRequired" label="Services Required" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
            <Form.Item name="notes" label="Notes" className="md:col-span-2"><Input.TextArea rows={3} /></Form.Item>
          </div>
          <Button type="primary" htmlType="submit" loading={isUpdating} block size="large">Save Changes</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UpgradeApplicationDetailsPage;
