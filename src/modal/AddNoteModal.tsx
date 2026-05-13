import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { X } from 'lucide-react';

interface AddNoteModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ open, onCancel, onFinish }) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      closeIcon={
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500">
          <X size={16} />
        </div>
      }
    >
      <div className="mb-6 pt-2">
        <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Add Note</h2>
        <p className="text-slate-400 text-xs">Add a private note to this shipment</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="note" rules={[{ required: true, message: 'Please enter a note' }]}>
          <Input.TextArea
            rows={4}
            placeholder="Type your note here..."
            style={{ borderRadius: 12 }}
            className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
          />
        </Form.Item>
        <div className="flex gap-3 mt-2">
          <Button
            block
            onClick={onCancel}
            className="h-10 border-slate-200 text-slate-600 font-semibold"
            style={{ borderRadius: 10 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="h-10 bg-blue-600 hover:bg-blue-700 border-none font-semibold"
            style={{ borderRadius: 10 }}
          >
            Submit Note
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
