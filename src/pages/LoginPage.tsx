import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Truck, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser, setResetEmail } from "../redux/slices/authSlice";
import {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../redux/api/auth/authApi";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const resetEmail = useAppSelector((state) => state.auth.resetEmail);

  // Determine view based on path
  const [view, setView] = useState<"login" | "forgot" | "otp" | "reset">("login");

  useEffect(() => {
    if (location.pathname === "/forgot-password") setView("forgot");
    else if (location.pathname === "/otp-verify") setView("otp");
    else if (location.pathname === "/reset-password") setView("reset");
    else setView("login");
  }, [location.pathname]);

  // Mutations
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  // Login Handler
  const onLoginFinish = async (values: any) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (res.success) {
        const { data } = res;
        localStorage.setItem("token", data.token);
        const userData = {
          id: data.user?.id || "1",
          name: data.user?.name || "User",
          email: values.email,
          role: data.user?.role || "admin",
        };
        localStorage.setItem("buan_user_data", JSON.stringify(userData));
        localStorage.setItem("buan_logged_in", "true");
        localStorage.setItem("role", userData.role);
        
        dispatch(setUser(userData));
        message.success("Login successful!");
        navigate("/");
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Invalid email or password.");
    }
  };

  // Forgot Password Handler
  const onForgotFinish = async (values: { email: string }) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      if (res.success) {
        dispatch(setResetEmail(values.email));
        message.success("OTP sent to your email!");
        navigate("/otp-verify");
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to send OTP.");
    }
  };

  // OTP Verification Handler
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ];

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const onOtpSubmit = () => {
    const code = otp.join("");
    if (code.length === 6) {
      localStorage.setItem("resetOtpCode", code);
      navigate("/reset-password");
    } else {
      message.error("Please enter a 6-digit OTP.");
    }
  };

  // Reset Password Handler
  const onResetFinish = async (values: any) => {
    const otpCode = localStorage.getItem("resetOtpCode");
    if (!otpCode) {
      message.error("OTP not found. Please start over.");
      navigate("/forgot-password");
      return;
    }

    try {
      const res = await resetPassword({
        token: otpCode,
        newPassword: values.password,
        confirmNewPassword: values.confirmPassword,
      }).unwrap();

      if (res.success) {
        message.success("Password reset successful!");
        localStorage.removeItem("resetOtpCode");
        navigate("/login");
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#f8fafc" }}>
      {/* Left panel - Same for all views */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
        }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: "white" }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full opacity-5" style={{ background: "white" }} />

        <div className="flex items-center gap-3 relative z-10">
          <div className="rounded-2xl mb-2 px-3 py-2 bg-white">
            <img src="/buan-logo.png" alt="" className="h-12 w-12" />
          </div>
          <div>
            <span className="text-white text-xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
              Buan Logistics
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Manage your
              <br />
              Buan Logistics smarter
            </h1>
            <p className="mt-3 text-blue-200 text-base leading-relaxed">
              Track shipments, manage hubs, and streamline your delivery operations from one powerful dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Shipments", value: "1,240" },
              { label: "Delivery Hubs", value: "48" },
              { label: "Staff Members", value: "320" },
              { label: "Cities Covered", value: "85" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-xs relative z-10">© 2026 Buan Logistics. All rights reserved.</p>
      </div>

      {/* Right panel - Changes based on view */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Truck size={17} className="text-white" />
            </div>
            <span className="text-slate-800 text-lg font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
              Buan Logistics
            </span>
          </div>

          {view === "login" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Sora, sans-serif" }}>
                  Welcome back 👋
                </h2>
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

              <Form
                layout="vertical"
                onFinish={onLoginFinish}
                initialValues={{
                  email: "admin@buanenterprise.com",
                  password: "admin123",
                  remember: true,
                }}
              >
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                >
                  <Input
                    prefix={<Mail size={14} className="text-slate-400" />}
                    placeholder="admin@buanenterprise.com"
                    style={{ height: 44, borderRadius: 10 }}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password
                    prefix={<Lock size={14} className="text-slate-400 cursor-pointer" />}
                    placeholder="••••••••"
                    style={{ height: 44, borderRadius: 10 }}
                    iconRender={(visible) =>
                      visible ? (
                        <Eye size={14} className="text-slate-400 cursor-pointer" />
                      ) : (
                        <EyeOff size={14} className="text-slate-400 cursor-pointer" />
                      )
                    }
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-5">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>
                      <span className="text-sm text-slate-500">Remember me</span>
                    </Checkbox>
                  </Form.Item>
                  <p
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </p>
                </div>

                <Form.Item noStyle>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoginLoading}
                    block
                    style={{
                      height: 46,
                      borderRadius: 12,
                      background: "#2563eb",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {isLoginLoading ? "Signing in..." : "Sign In to Dashboard"}
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}

          {view === "forgot" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Sora, sans-serif" }}>
                  Forgot Password? 🔒
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Enter your email and we'll send you an OTP to reset your password.
                </p>
              </div>

              <Form layout="vertical" onFinish={onForgotFinish}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, type: "email", message: "Please enter your email" }]}
                >
                  <Input
                    prefix={<Mail size={14} className="text-slate-400" />}
                    placeholder="your@email.com"
                    style={{ height: 44, borderRadius: 10 }}
                  />
                </Form.Item>

                <Form.Item noStyle>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isForgotLoading}
                    block
                    style={{
                      height: 46,
                      borderRadius: 12,
                      background: "#2563eb",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {isForgotLoading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </Form.Item>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft size={14} /> Back to login
                  </button>
                </div>
              </Form>
            </>
          )}

          {view === "otp" && (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Sora, sans-serif" }}>
                  Verify OTP ✉️
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  We sent a code to <span className="font-semibold text-slate-700">{resetEmail}</span>
                </p>
              </div>

              <div className="flex gap-3 mb-8 justify-center">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all duration-200 
                      ${v ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-800"}
                      focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
                  />
                ))}
              </div>

              <Button
                type="primary"
                onClick={onOtpSubmit}
                block
                style={{
                  height: 46,
                  borderRadius: 12,
                  background: "#2563eb",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Continue
              </Button>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </>
          )}

          {view === "reset" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Sora, sans-serif" }}>
                  Set New Password 🆕
                </h2>
                <p className="text-slate-400 text-sm mt-1">Create a strong password for your account.</p>
              </div>

              <Form layout="vertical" onFinish={onResetFinish}>
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your new password" },
                    { min: 8, message: "Password must be at least 8 characters" },
                  ]}
                >
                  <Input.Password
                    prefix={<Lock size={14} className="text-slate-400" />}
                    placeholder="••••••••"
                    style={{ height: 44, borderRadius: 10 }}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("The two passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<Lock size={14} className="text-slate-400" />}
                    placeholder="••••••••"
                    style={{ height: 44, borderRadius: 10 }}
                  />
                </Form.Item>

                <Form.Item noStyle>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isResetLoading}
                    block
                    style={{
                      height: 46,
                      borderRadius: 12,
                      background: "#2563eb",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {isResetLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
