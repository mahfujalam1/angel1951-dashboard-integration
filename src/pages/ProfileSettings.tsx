import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message } from 'antd';
import { Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();

  const handleProfileSave = () => {
    message.success('Profile updated successfully!');
  };

  const handlePasswordSave = (values: { current: string; newPass: string; confirm: string }) => {
    if (values.newPass !== values.confirm) {
      message.error('New passwords do not match!');
      return;
    }
    message.success('Password changed successfully!');
    passForm.resetFields();
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 pt-8 pb-14 text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
              <img src="https://i.pravatar.cc/80?img=50" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center text-blue-600 shadow border border-blue-100">
              <Camera size={13} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-6 mb-5 text-center">
            <div className="bg-white inline-block px-4 py-1 rounded-full shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>{user?.name}</h3>
              <p className="text-xs text-slate-400">{user?.role}</p>
            </div>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab} centered
            items={[
              { key: 'profile', label: 'Edit Profile' },
              { key: 'password', label: 'Change Password' },
            ]}
          />

          {activeTab === 'profile' && (
            <Form form={form} layout="vertical" onFinish={handleProfileSave} className="mt-4"
              initialValues={{ username: user?.name, email: user?.email, contact: '+90007307007', address: '79/A Joker Vla, Gotham City' }}>
              <Form.Item label="User Name" name="username" rules={[{ required: true }]}>
                <Input placeholder="Your username" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="your@email.com" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Contact No" name="contact">
                <Input placeholder="+90007307007" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input placeholder="Your address" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Button type="primary" htmlType="submit" block style={{ height: 44, borderRadius: 12, background: '#2563eb', fontWeight: 600 }}>
                Save & Change
              </Button>
            </Form>
          )}

          {activeTab === 'password' && (
            <Form form={passForm} layout="vertical" onFinish={handlePasswordSave} className="mt-4">
              <Form.Item label="Current Password" name="current" rules={[{ required: true }]}>
                <Input.Password placeholder="••••••••" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="New Password" name="newPass" rules={[{ required: true, min: 6 }]}>
                <Input.Password placeholder="••••••••" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Confirm New Password" name="confirm" rules={[{ required: true }]}>
                <Input.Password placeholder="••••••••" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Button type="primary" htmlType="submit" block style={{ height: 44, borderRadius: 12, background: '#2563eb', fontWeight: 600 }}>
                Save & Change
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
