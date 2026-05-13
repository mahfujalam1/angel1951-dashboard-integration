import React from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { UserCheck, X } from 'lucide-react';

interface AssignStaffModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const AssignStaffModal: React.FC<AssignStaffModalProps> = ({ open, onCancel, onFinish }) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={450}
      closeIcon={
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500">
          <X size={16} />
        </div>
      }
    >
      <div className="text-center mb-6 pt-2">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserCheck size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Assign Staff</h2>
        <p className="text-slate-400 text-sm">Select a staff member for this shipment</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="staff" label="Select Staff" rules={[{ required: true }]}>
          <Select
            size="large"
            placeholder="Choose a staff member..."
            style={{ borderRadius: 12 }}
            options={[
              { value: 'sajid', label: 'Sajidur Rahman (Delivery)' },
              { value: 'arif', label: 'Arif Ahmed (Hub Manager)' },
              { value: 'kamal', label: 'Kamal Hossain (Logistics)' },
            ]}
          />
        </Form.Item>
        <div className="flex gap-3 mt-4">
          <Button
            block
            size="large"
            onClick={onCancel}
            className="h-12 border-slate-200 text-slate-600 font-semibold"
            style={{ borderRadius: 12 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            className="h-12 bg-blue-600 hover:bg-blue-700 border-none font-semibold"
            style={{ borderRadius: 12 }}
          >
            Assign Staff
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AssignStaffModal;
