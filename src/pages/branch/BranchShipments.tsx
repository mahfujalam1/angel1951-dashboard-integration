import React, { useState } from "react";
import { Table, Tag, Button, Input, Select, Space, Modal, message } from "antd";
import {
  Package,
  Search,
  Plus,
  Eye,
  Truck,
  Filter,
  ExternalLink,
  MapPin,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

const { Option } = Select;

interface Shipment {
  id: string;
  trackingId: string;
  sender: string;
  receiver: string;
  type: "Corporate" | "Business" | "Container" | "Individual";
  status: string;
  date: string;
  orgId?: string;
  email?: string;
}

const BranchShipments: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data
  const [shipments] = useState<Shipment[]>([
    {
      id: "1",
      trackingId: "ANGL-74291",
      sender: "Tech Corp",
      receiver: "John Smith",
      type: "Corporate",
      status: "In Transit",
      date: "2024-03-21",
      orgId: "TC-99",
      email: "ship@techcorp.com",
    },
    {
      id: "2",
      trackingId: "ANGL-18302",
      sender: "Sarah Ali",
      receiver: "Buan Hub",
      type: "Business",
      status: "Pending",
      date: "2024-03-20",
      email: "sarah@ali.com",
    },
    {
      id: "3",
      trackingId: "ANGL-99281",
      sender: "Global Log",
      receiver: "UK Branch",
      type: "Container",
      status: "Delivered",
      date: "2024-03-19",
      orgId: "GL-12",
      email: "global@logistics.com",
    },
    {
      id: "4",
      trackingId: "ANGL-22019",
      sender: "Michael Chen",
      receiver: "Sarah Johnson",
      type: "Individual",
      status: "In Transit",
      date: "2024-03-22",
      email: "m.chen@example.com",
    },
  ]);

  const filteredShipments = shipments.filter((s) => {
    const matchesType = filterType ? s.type === filterType : true;
    const matchesSearch = searchQuery
      ? s.orgId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  const columns = [
    {
      title: "Tracking ID",
      dataIndex: "trackingId",
      key: "trackingId",
      render: (text: string) => (
        <span className="font-bold text-blue-600">{text}</span>
      ),
    },
    {
      title: "Sender / Organization",
      key: "sender",
      render: (_: any, record: Shipment) => (
        <div>
          <div className="font-semibold text-slate-800">{record.sender}</div>
          <div className="text-xs text-slate-400">
            {record.orgId || record.email}
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag
          color={
            type === "Corporate"
              ? "purple"
              : type === "Business"
                ? "blue"
                : type === "Container"
                  ? "orange"
                  : type === "Individual"
                    ? "cyan"
                    : "default"
          }
        >
          {type}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Delivered" ? "green" : "processing"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Shipment) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => {
              navigate(`/branch/shipments/${record.id}`);
            }}
          />
          <Button
            type="primary"
            onClick={() => navigate(`/branch/track/${record.id}`)}
          >
            Track
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <Package size={24} />
          </div>
          <div>
            <h1
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Branch Shipments
            </h1>
            <p className="text-slate-500 text-sm">
              Review and track all shipments under this branch
            </p>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<Plus size={18} />}
          className="bg-blue-600 h-12 rounded-xl px-6 font-bold"
          onClick={() => navigate("/branch/create-shipment")}
        >
          Create Shipment
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-4 bg-white">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <Select
              placeholder="Shipment Type"
              style={{ width: 160 }}
              allowClear
              className="rounded-md"
              onChange={(val) => setFilterType(val)}
            >
              <Option value="Corporate">Corporate</Option>
              <Option value="Business">Business</Option>
              <Option value="Container">Container</Option>
              <Option value="Individual">Individual</Option>
            </Select>
          </div>

          <Input
            placeholder="Search by tracking ID, email or org ID..."
            prefix={<Search size={18} className="text-slate-400" />}
            className="flex-1 max-w-md h-10 rounded-md border-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredShipments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default BranchShipments;
