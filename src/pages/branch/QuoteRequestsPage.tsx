import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Input,
  message,
  InputNumber,
  Space,
  Descriptions,
} from "antd";
import {
  Eye,
  Mail,
  Search,
  FileText,
  User,
  MapPin,
  Calculator,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";

interface QuoteRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  weight: string;
  dimensions: string;
  serviceType: string;
  items: string;
  status: "pending" | "responded";
  requestDate: string;
}

const QuoteRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(
    null,
  );

  const [requests] = useState<QuoteRequest[]>([
    {
      id: "QR001",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+880 1712 345678",
      origin: "Dhaka, BD",
      destination: "London, UK",
      weight: "5.2 KG",
      dimensions: "30x20x15 cm",
      serviceType: "Air Cargo",
      items: "Personal documents and 2 laptops",
      status: "pending",
      requestDate: "2024-03-20",
    },
  ]);

  const handleSendBudget = () => {
    if (!budget || !selectedRequest) {
      message.error("Please enter a budget amount");
      return;
    }
    message.success(
      `Budget proposal of $${budget} sent to ${selectedRequest.email}`,
    );
    setIsModalOpen(false);
    setBudget(null);
    setSelectedRequest(null);
  };

  const columns = [
    {
      title: "Customer",
      key: "customer",
      render: (_: any, record: QuoteRequest) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <User size={18} />
          </div>
          <div>
            <div className="font-bold text-slate-800">
              {record.customerName}
            </div>
            <div className="text-xs text-slate-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Route",
      key: "route",
      render: (_: any, record: QuoteRequest) => (
        <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
          {record.origin} <ArrowRight size={14} className="text-slate-300" />{" "}
          {record.destination}
        </div>
      ),
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (text: string) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "pending" ? "orange" : "green"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: QuoteRequest) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} className="text-slate-500" />}
            onClick={() => {
              navigate(`/branch/quotes/${record.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1
            className="text-2xl font-bold text-slate-800"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Quote Requests
          </h1>
          <p className="text-slate-500 text-sm">
            Review shipping inquiries and provide budget estimates
          </p>
        </div>
        <div className="relative flex-1 max-w-md ml-8">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
            size={18}
          />
          <Input
            placeholder="Search by customer or email..."
            className="pl-10 h-11 rounded-xl shadow-sm border-none"
          />
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={
          <span className="flex items-center gap-2">
            <Calculator size={18} className="text-blue-600" /> Quick Budget
            Proposal
          </span>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
          setBudget(null);
        }}
        onOk={handleSendBudget}
        okText="Send Proposal"
        okButtonProps={{ className: "bg-blue-600 rounded-lg" }}
      >
        {selectedRequest && (
          <div className="py-4 space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Customer
              </p>
              <p className="text-sm font-bold text-slate-700">
                {selectedRequest.customerName}
              </p>
              <p className="text-xs text-slate-500">{selectedRequest.email}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Estimated Budget (USD)
              </label>
              <InputNumber
                className="w-full h-11 rounded-xl flex items-center bg-white"
                placeholder="Enter amount"
                min={0}
                value={budget}
                onChange={(val) => setBudget(val)}
                prefix={<span className="text-slate-400 mr-1">$</span>}
              />
            </div>

            <p className="text-[10px] text-slate-400 italic">
              * This will send an automated email proposal to the customer.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const ArrowRight: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default QuoteRequestsPage;
