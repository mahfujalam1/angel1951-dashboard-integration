import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Input, Button, Table, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "../../components/ui/Card";

const chartData = [
  { name: "Jan", shipments: 400, revenue: 2400 },
  { name: "Feb", shipments: 300, revenue: 1398 },
  { name: "Mar", shipments: 200, revenue: 9800 },
  { name: "Apr", shipments: 278, revenue: 3908 },
  { name: "May", shipments: 189, revenue: 4800 },
  { name: "Jun", shipments: 239, revenue: 3800 },
];

const pieData = [
  { name: "Regular", value: 400 },
  { name: "Corporate", value: 300 },
  { name: "Business", value: 300 },
  { name: "Container", value: 200 },
];

const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c"];

const BranchDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [trackingQuery, setTrackingQuery] = useState("");

  const handleTrack = () => {
    const trimmed = trackingQuery.trim();
    if (!trimmed) return;
    navigate(`/branch/track/${trimmed}`);
  };

  // Mock Parcel Requests from Hubs
  const parcelRequests = [
    {
      id: "HUB-PR-001",
      hub: "Uttara Hub",
      sender: "john@example.com",
      status: "awaiting",
      time: "10 mins ago",
    },
    {
      id: "HUB-PR-002",
      hub: "Banani Hub",
      sender: "sarah@business.com",
      status: "picked_up",
      time: "2 hours ago",
    },
  ];

  const handleReceiveParcel = (id: string) => {
    message.success(
      `Parcel ${id} manually received at branch. Redirecting to complete shipment creation...`,
    );
    navigate("/branch/create-shipment");
  };

  const requestColumns = [
    { title: "Hub", dataIndex: "hub", key: "hub" },
    { title: "Sender Email", dataIndex: "sender", key: "sender" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "awaiting" ? "orange" : "blue"}>
          {status.toUpperCase().replace("_", " ")}
        </Tag>
      ),
    },
    { title: "Time", dataIndex: "time", key: "time" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleReceiveParcel(record.id)}
        >
          Receive & Create
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Branch Overview
            </h1>
            <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
              <Clock size={14} /> Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Enter tracking number..."
            prefix={<Search size={18} className="text-slate-400" />}
            className="w-full md:w-80 border-slate-300 rounded-md h-10"
            value={trackingQuery}
            onChange={(e) => setTrackingQuery(e.target.value)}
            onPressEnter={handleTrack}
          />
          <Button
            type="primary"
            className="h-10 rounded-md"
            onClick={handleTrack}
          >
            Track
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Today's Shipments",
            value: "48",
            trend: "+12%",
            icon: Package,
            color: "blue",
          },
          {
            label: "Incoming Parcels",
            value: "14",
            trend: "High Priority",
            icon: Truck,
            color: "orange",
          },
          {
            label: "Active Customers",
            value: "256",
            trend: "8 new",
            icon: Users,
            color: "purple",
          },
          {
            label: "Growth Rate",
            value: "+12.5%",
            trend: "Trending Up",
            icon: TrendingUp,
            color: "rose",
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center mb-4`}
            >
              <stat.icon className={`text-${stat.color}-600`} size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-800 tracking-tight">
                  {stat.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3
            className="text-lg font-bold text-slate-800 mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Shipment Volume Trends
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="shipments"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3
            className="text-lg font-bold text-slate-800 mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Customer Distribution
          </h3>
          <div className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 ml-4">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incoming Parcel Requests */}
        <div className="lg:col-span-2">
          <Card
            title="Incoming Parcel Requests (Hubs)"
            className="h-full border-none shadow-sm"
          >
            <div className="mb-4 text-xs text-slate-400 bg-amber-50 p-3 rounded-lg border border-amber-100 flex items-center gap-2">
              <AlertCircle size={14} className="text-amber-500" />
              These parcels are ready at hubs. Once manually received, they will
              be converted to shipments.
            </div>
            <Table
              dataSource={parcelRequests}
              columns={requestColumns}
              rowKey="id"
              pagination={false}
              className="mt-2"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BranchDashboard;
