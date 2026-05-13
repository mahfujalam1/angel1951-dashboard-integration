import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Input,
  message,
  Tabs,
  Card,
  Statistic,
  Select,
  Space,
  Descriptions,
  Image,
  InputNumber,
} from "antd";
import {
  Truck,
  Package,
  Search,
  DollarSign,
  CheckCircle,
  Clock,
  Info,
  ArrowRight,
  User,
  Building2,
  Mail,
  MapPin,
  CreditCard,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

interface HubProvider {
  id: string;
  name: string;
  email: string;
  location: string;
  totalParcels: number;
  unpaidAmount: number;
}

interface ParcelRequest {
  id: string;
  hubName: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  destination: string;
  description: string;
  status: "awaiting_pickup" | "picked_up";
  date: string;
  imageUrl: string;
}

const HubManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [selectedHub, setSelectedHub] = useState<HubProvider | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [ratePerParcel, setRatePerParcel] = useState<number | null>(null);
  const [parcelSearch, setParcelSearch] = useState("");
  const [hubFilter, setHubFilter] = useState("");

  const [hubs] = useState<HubProvider[]>([
    {
      id: "HUB001",
      name: "Uttara Hub",
      email: "uttara@hub.com",
      location: "Uttara, Sector 4",
      totalParcels: 145,
      unpaidAmount: 7250,
    },
  ]);

  const [parcelRequests] = useState<ParcelRequest[]>([
    {
      id: "PRQ001",
      hubName: "Uttara Hub",
      senderName: "Mahfuj Alam",
      senderEmail: "mahfuj@example.com",
      senderPhone: "+234 812 345 6789",
      destination: "Lagos, Nigeria",
      description: "Electronics and fragile glassware in a medium box.",
      status: "awaiting_pickup",
      date: "2024-03-21",
      imageUrl:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=400&auto=format&fit=crop",
    },
  ]);

  const handleProcessPayment = () => {
    if (paymentAmount <= 0) {
      message.error("Please enter a valid payment amount");
      return;
    }
    message.success(
      `Payment of $${paymentAmount} USD processed for ${selectedHub?.name}`,
    );
    setIsPaymentModalOpen(false);
    setPaymentAmount(0);
    setRatePerParcel(null);
  };

  const handleRateChange = (rate: number) => {
    setRatePerParcel(rate);
    if (selectedHub) {
      const calculated = (selectedHub.unpaidAmount * rate) / 100;
      setPaymentAmount(Number(calculated.toFixed(2)));
    }
  };

  const hubColumns = [
    {
      title: "Hub Provider",
      key: "hub",
      render: (_: any, record: HubProvider) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <Building2 size={18} />
          </div>
          <div>
            <div className="font-bold text-slate-800">{record.name}</div>
            <div className="text-xs text-slate-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text: string) => (
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin size={14} /> {text}
        </div>
      ),
    },
    {
      title: "Total Parcels",
      dataIndex: "totalParcels",
      key: "totalParcels",
      render: (count: number) => <Tag color="blue">{count} Delivery</Tag>,
    },
    {
      title: "Pending Settle",
      dataIndex: "unpaidAmount",
      key: "unpaidAmount",
      render: (amt: number) => (
        <span className="font-bold text-emerald-600">${amt}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: HubProvider) => (
        <Button
          type="primary"
          size="small"
          icon={<CreditCard size={14} />}
          className="bg-emerald-600 border-none rounded-lg"
          onClick={() => {
            setSelectedHub(record);
            setPaymentAmount(record.unpaidAmount);
            setIsPaymentModalOpen(true);
          }}
        >
          Pay Hub
        </Button>
      ),
    },
  ];

  const requestColumns = [
    {
      title: "Sender",
      key: "sender",
      render: (_: any, record: ParcelRequest) => (
        <div>
          <div className="font-bold text-slate-800">{record.senderName}</div>
          <div className="text-[10px] text-slate-400">{record.senderEmail}</div>
        </div>
      ),
    },
    {
      title: "Hub Source",
      dataIndex: "hubName",
      key: "hubName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = { awaiting_pickup: "orange", picked_up: "blue" };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase().replace("_", " ")}
          </Tag>
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
      render: (_: any, record: ParcelRequest) => (
        <Button
          type="text"
          icon={<Eye size={16} className="text-slate-500" />}
          onClick={() => {
            navigate(`/branch/hubs/parcels/${record.id}`);
          }}
        />
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
            Hub & Intake Management
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor provider performance and process incoming parcels
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Find by Org or Email..."
            prefix={<Search size={16} className="text-slate-400" />}
            className="w-64 rounded-md h-10 border-slate-300"
          />
          <Button type="primary" className="h-10 rounded-md bg-blue-600">
            Search
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
      >
        <TabPane
          tab={
            <span className="flex items-center gap-2 px-2 py-1">
              <Building2 size={16} /> Hub Providers
            </span>
          }
          key="1"
        >
          <Table columns={hubColumns} dataSource={hubs} rowKey="id" />
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-2 px-2 py-1">
              <Package size={16} /> Parcel Requests
            </span>
          }
          key="2"
        >
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Search by sender name or email..."
              prefix={<Search size={15} className="text-slate-400" />}
              className="max-w-xs h-10 rounded-md border-slate-300"
              value={parcelSearch}
              onChange={(e) => setParcelSearch(e.target.value)}
              allowClear
            />
            <Input
              placeholder="Filter by hub source..."
              prefix={<Building2 size={15} className="text-slate-400" />}
              className="max-w-xs h-10 rounded-md border-slate-300"
              value={hubFilter}
              onChange={(e) => setHubFilter(e.target.value)}
              allowClear
            />
          </div>
          <Table
            columns={requestColumns}
            dataSource={parcelRequests.filter((p) => {
              const q = parcelSearch.toLowerCase();
              const h = hubFilter.toLowerCase();
              const matchSender =
                !q ||
                p.senderName.toLowerCase().includes(q) ||
                p.senderEmail.toLowerCase().includes(q);
              const matchHub = !h || p.hubName.toLowerCase().includes(h);
              return matchSender && matchHub;
            })}
            rowKey="id"
          />
        </TabPane>
      </Tabs>

      {/* Hub Payment Modal */}
      <Modal
        title={
          <span className="font-bold flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-600" /> Settle Hub
            Payment
          </span>
        }
        open={isPaymentModalOpen}
        onCancel={() => setIsPaymentModalOpen(false)}
        onOk={handleProcessPayment}
        okText="Confirm Payment"
        okButtonProps={{ className: "bg-emerald-600 rounded-lg h-10" }}
        cancelButtonProps={{ className: "rounded-lg h-10" }}
      >
        {selectedHub && (
          <div className="py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Delivered Parcels
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {selectedHub.totalParcels}
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">
                  Outstanding Balance
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  ${selectedHub.unpaidAmount}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Select Rate Per Parcel (%)
                </label>
                <Select
                  className="w-full h-11 rounded-xl"
                  placeholder="Choose percentage..."
                  value={ratePerParcel}
                  onChange={handleRateChange}
                >
                  <Select.Option value={5}>5% per parcel</Select.Option>
                  <Select.Option value={10}>10% per parcel</Select.Option>
                  <Select.Option value={15}>15% per parcel</Select.Option>
                  <Select.Option value={20}>20% per parcel</Select.Option>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Total Amount to Pay
                </label>
                <InputNumber
                  className="w-full h-12 flex items-center rounded-xl text-lg font-bold"
                  size="large"
                  value={paymentAmount}
                  onChange={(val) => setPaymentAmount(val || 0)}
                  prefix={<span className="text-slate-400 mr-1">$</span>}
                />
                <p className="text-[10px] text-slate-400 italic mt-1">
                  Calculation: {ratePerParcel || 0}% rate on $
                  {selectedHub.unpaidAmount} pending = ${paymentAmount}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const Plus: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
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
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default HubManagementPage;
