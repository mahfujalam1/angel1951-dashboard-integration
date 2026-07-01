import React from 'react';
import { Modal, Upload as AntUpload, Button } from 'antd';
import { Upload, X } from 'lucide-react';

const { Dragger } = AntUpload;

interface UploadDocsModalProps {
  open: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const UploadDocsModal: React.FC<UploadDocsModalProps> = ({ open, onCancel, onFinish }) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={480}
      closeIcon={
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500">
          <X size={16} />
        </div>
      }
    >
      <div className="mb-6 pt-2">
        <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Upload Documents</h2>
        <p className="text-slate-400 text-xs">Upload relevant files for this shipment</p>
      </div>

      <Dragger
        name="file"
        multiple={true}
        className="bg-slate-50 border border-dashed border-slate-200 rounded p-8 hover:border-blue-400 transition-all mb-6"
      >
        <p className="ant-upload-drag-icon flex justify-center mb-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
            <Upload size={28} />
          </div>
        </p>
        <p className="text-sm font-bold text-slate-700 mb-1">Click or drag file to this area to upload</p>
        <p className="text-xs text-slate-400 px-10">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>

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
          onClick={() => onFinish({})}
          className="h-12 bg-blue-600 hover:bg-blue-700 border-none font-semibold"
          style={{ borderRadius: 12 }}
        >
          Upload & Submit
        </Button>
      </div>
    </Modal>
  );
};

export default UploadDocsModal;
