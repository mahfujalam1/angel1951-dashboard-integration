import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Truck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    const ok = await login(values.email, values.password);
    setLoading(false);
    if (!ok) message.error('Invalid email or password.');
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'white' }} />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'white' }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full opacity-5"
          style={{ background: 'white' }} />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Truck size={20} className="text-white" />
          </div>
          <span className="text-white text-xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>Buan Logistics</span>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              Manage your<br />Buan Logistics smarter
            </h1>
            <p className="mt-3 text-blue-200 text-base leading-relaxed">
              Track shipments, manage hubs, and streamline your delivery operations from one powerful dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Shipments', value: '1,240' },
              { label: 'Delivery Hubs',    value: '48' },
              { label: 'Staff Members',    value: '320' },
              { label: 'Cities Covered',   value: '85' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-xs relative z-10">© 2026 Buan Logistics. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="text-slate-800 text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>Buan Logistics</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>Welcome back 👋</h2>
            <p className="text-slate-400 text-sm mt-1">Sign in to your dashboard</p>
          </div>

          {/* Demo credentials hint */}
          <div className="mb-6 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-1">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase">Admin</p>
                <p className="text-[11px] text-blue-500">📧 admin@buanenterprise.com</p>
                <p className="text-[11px] text-blue-500">🔒 admin123</p>
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase">Branch</p>
                <p className="text-[11px] text-blue-500">📧 branch@buanenterprise.com</p>
                <p className="text-[11px] text-blue-500">🔒 branch123</p>
              </div>
            </div>
          </div>

          <Form layout="vertical" onFinish={onFinish} initialValues={{ email: 'admin@buanenterprise.com', password: 'admin123', remember: true }}>
            <Form.Item label="Email Address" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<Mail size={14} className="text-slate-400" />} placeholder="admin@buanenterprise.com"
                style={{ height: 44, borderRadius: 10 }} />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password prefix={<Lock size={14} className="text-slate-400 cursor-pointer" />} placeholder="••••••••"
                style={{ height: 44, borderRadius: 10 }}
                iconRender={visible => visible ? <Eye size={14} className="text-slate-400 cursor-pointer" /> : <EyeOff size={14} className="text-slate-400 cursor-pointer" />} />
            </Form.Item>

            <div className="flex items-center justify-between mb-5">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox><span className="text-sm text-slate-500">Remember me</span></Checkbox>
              </Form.Item>
              <p className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
                Forgot password?
              </p>
            </div>

            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" loading={loading} block
                style={{ height: 46, borderRadius: 12, background: '#2563eb', fontWeight: 600, fontSize: 14 }}>
                {loading ? 'Signing in...' : 'Sign In to Dashboard'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
