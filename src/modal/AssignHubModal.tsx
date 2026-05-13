import React from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { Building2, X } from 'lucide-react';

interface AssignHubModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const AssignHubModal: React.FC<AssignHubModalProps> = ({ open, onCancel, onFinish }) => {
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
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Building2 size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Assign Hub</h2>
        <p className="text-slate-400 text-sm">Select a hub to assign this shipment</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="hub" label="Select Hub" rules={[{ required: true }]}>
          <Select
            size="large"
            placeholder="Choose a hub..."
            style={{ borderRadius: 12 }}
            options={[
              { value: 'dhaka-hub', label: 'Dhaka Main Hub' },
              { value: 'chittagong-hub', label: 'Chittagong Distribution Point' },
              { value: 'rajshahi-hub', label: 'Rajshahi Express Center' },
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
            Assign Hub
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AssignHubModal;
