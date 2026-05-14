import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  message,
  Tooltip,
} from "antd";
import {
  Package,
  Search,
  Plus,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

const { Option } = Select;

interface Shipment {
  id: string;
  trackingId: string;
  sender: string;
  receiver: string;
  type: "Corporate" | "Business" | "Personalized Cargo" | "Individual";
  status: string;
  date: string;
  orgId?: string;
  email?: string;
  paidInstalments?: number;
}

const CorporateShipmentsPage: React.FC = () => {
  const navigate = useNavigate();
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
      id: "6",
      trackingId: "ANGL-88210",
      sender: "Global Logistics",
      receiver: "Jane Doe",
      type: "Corporate",
      status: "Shipment Created",
      date: "2024-03-24",
      orgId: "GL-12",
      email: "contact@globallogistics.com",
    },
    {
      id: "7",
      trackingId: "ANGL-55321",
      sender: "Nexus Corp",
      receiver: "Alice Williams",
      type: "Corporate",
      status: "Delivered",
      date: "2024-03-25",
      orgId: "NC-44",
      email: "hello@nexuscorp.com",
    }
  ]);

  const filteredShipments = shipments.filter((s) => {
    const isCorporate = s.type === "Corporate";
    const matchesSearch = searchQuery
      ? s.orgId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.trackingId.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return isCorporate && matchesSearch;
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
        <Tag color="purple">
          {type}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let colorClasses = "text-gray-500 border-gray-400 bg-gray-50";
        switch (status) {
          case "Shipment Created":
            colorClasses = "text-orange-500 border-orange-400 bg-orange-50";
            break;
          case "At Hub":
            colorClasses = "text-emerald-500 border-emerald-400 bg-emerald-50";
            break;
          case "In Transit":
            colorClasses = "text-blue-500 border-blue-400 bg-blue-50";
            break;
          case "Custom Processing":
            colorClasses = "text-purple-500 border-purple-400 bg-purple-50";
            break;
          case "Out of Delivery":
            colorClasses = "text-slate-500 border-slate-400 bg-slate-50";
            break;
          case "Delivered":
            colorClasses = "text-yellow-600 border-yellow-500 bg-yellow-50";
            break;
        }
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${colorClasses}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center" as const,
      render: (_: any, record: Shipment) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => {
              navigate(`/branch/shipments/${record.id}`);
            }}
          />
          {record.status !== "Delivered" && (
            <Tooltip
              title={
                record.type === "Personalized Cargo" &&
                (record.paidInstalments || 0) < 2
                  ? "Delivery blocked: Personalized Cargo requires 2/2 instalments paid."
                  : ""
              }
            >
              <Select
                size="small"
                defaultValue={record.status}
                style={{ width: 140 }}
                disabled={
                  record.type === "Personalized Cargo" &&
                  (record.paidInstalments || 0) < 2
                }
                onChange={(newStatus) => {
                  message.success(
                    `Shipment ${record.trackingId} status updated to ${newStatus}`
                  );
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {["At Hub", "In Transit", "Custom Processing", "Out of Delivery", "Delivered"].map(status => (
                  <Option key={status} value={status}>{status}</Option>
                ))}
              </Select>
            </Tooltip>
          )}
          <Button
            type="default"
            size="small"
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
              Corporate Shipments
            </h1>
            <p className="text-slate-500 text-sm">
              Review and track corporate partner shipments
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
          <Input
            placeholder="Search by tracking ID, email or org ID..."
            prefix={<Search size={18} className="text-slate-400" />}
            className="max-w-md h-10 rounded-md border-slate-300"
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

export default CorporateShipmentsPage;
