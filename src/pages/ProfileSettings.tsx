import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Tabs, message, Skeleton } from 'antd';
import { Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChangePasswordMutation, useGetProfileQuery, useUpdateProfileMutation } from '../redux/api/auth/authApi';

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const ProfileSettings: React.FC = () => {
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();
  
  const { data: profileRes, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const user = profileRes?.data;
  const profile = user?.profile;
  const baseUrl = (import.meta as any).env.VITE_SERVER_URL;

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileRes?.success && profile) {
      form.setFieldsValue({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: user.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
      if (profile.avatar) {
        setAvatarPreview(profile.avatar.startsWith('http') ? profile.avatar : `${baseUrl}${profile.avatar}`);
      }
    }
  }, [profileRes, profile, form, baseUrl, user?.email]);

  const handleProfileSave = async (values: any) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      if (res.success) {
        message.success('Profile updated successfully!');
        setAvatarFile(null);
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to update profile.');
    }
  };

  const handlePasswordSave = async (values: { current: string; newPass: string; confirm: string }) => {
    if (values.newPass !== values.confirm) {
      message.error('New passwords do not match!');
      return;
    }

    try {
      const res = await changePassword({
        currentPassword: values.current,
        newPassword: values.newPass,
        confirmNewPassword: values.confirm,
      }).unwrap();

      if (res.success) {
        message.success('Password changed successfully!');
        passForm.setFieldsValue({ current: '', newPass: '', confirm: '' });
        passForm.resetFields();
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Failed to change password.');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 pt-10 pb-20 text-center relative">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto bg-slate-200">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Camera size={32} />
                </div>
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md border border-blue-100 hover:bg-slate-50 transition-colors cursor-pointer z-20"
            >
              <Camera size={16} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-10 mb-6 text-center relative z-10">
            <div className="bg-white inline-block px-8 py-3 rounded-2xl shadow-lg border border-slate-50">
              <h3 className="font-bold text-slate-800 text-xl mb-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : authUser?.name}
              </h3>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{user?.role || authUser?.role}</p>
            </div>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab} centered
            className="custom-profile-tabs"
            items={[
              { key: 'profile', label: <span className="cursor-pointer">Edit Profile</span> },
              { key: 'password', label: <span className="cursor-pointer">Change Password</span> },
            ]}
          />

          {isProfileLoading ? (
            <div className="mt-4"><Skeleton active /></div>
          ) : activeTab === 'profile' ? (
            <Form form={form} layout="vertical" onFinish={handleProfileSave} className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                  <Input placeholder="John" style={{ borderRadius: 10, height: 42 }} />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                  <Input placeholder="Doe" style={{ borderRadius: 10, height: 42 }} />
                </Form.Item>
              </div>
              <Form.Item label="Email" name="email">
                <Input placeholder="your@email.com" disabled style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="+1234567890" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input placeholder="123 Main St, Gotham City" style={{ borderRadius: 10, height: 42 }} />
              </Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isUpdatingProfile}
                block 
                className="cursor-pointer"
                style={{ height: 44, borderRadius: 12, background: '#2563eb', fontWeight: 600 }}
              >
                Save & Change
              </Button>
            </Form>
          ) : (
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
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isChangingPassword}
                block 
                className="cursor-pointer"
                style={{ height: 44, borderRadius: 12, background: '#2563eb', fontWeight: 600 }}
              >
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
