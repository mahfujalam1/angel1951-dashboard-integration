import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Modal,
  message,
  InputNumber,
  Checkbox,
} from "antd";
import {
  CreditCard,
  Search,
  Filter,
  Building2,
  ChevronRight,
  ArrowLeft,
  CheckSquare,
  Square,
  Send,
  Calculator,
  Percent,
  Layers,
} from "lucide-react";
import Card from "../../components/ui/Card";

const { Option } = Select;

interface Customer {
  id: string;
  name: string;
  email: string;
  type: "Business" | "Container" | "Corporate";
  orgName: string;
  orgId: string;
}

interface Shipment {
  id: string;
  trackingId: string;
  date: string;
  amount: number;
  status: "pending_invoice" | "invoiced";
}

// ─── Corporate Detail View (existing behaviour) ──────────────────────────────
const CorporateInvoiceView: React.FC<{
  customer: Customer;
  onBack: () => void;
}> = ({ customer, onBack }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const shipments: Shipment[] = [
    {
      id: "S1",
      trackingId: "ANGL-1001",
      date: "2024-03-01",
      amount: 4500,
      status: "pending_invoice",
    },
    {
      id: "S2",
      trackingId: "ANGL-1005",
      date: "2024-03-05",
      amount: 3200,
      status: "pending_invoice",
    },
    {
      id: "S3",
      trackingId: "ANGL-1012",
      date: "2024-03-12",
      amount: 1800,
      status: "pending_invoice",
    },
  ];

  const subtotal = useMemo(
    () =>
      shipments
        .filter((s) => selectedRowKeys.includes(s.id))
        .reduce((sum, s) => sum + s.amount, 0),
    [selectedRowKeys],
  );
  const total = subtotal - discount;

  const handleSendInvoice = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one shipment");
      return;
    }
    setIsInvoiceModalOpen(true);
  };

  const handleFinalize = () => {
    message.success(
      `Consolidated invoice of $${total} sent to ${customer.orgName}`,
    );
    setIsInvoiceModalOpen(false);
    setSelectedRowKeys([]);
    setDiscount(0);
    onBack();
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {customer.orgName}
            </h1>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <Tag color="purple">Corporate</Tag>• {customer.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Pending Shipments for Invoice">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {selectedRowKeys.length} Shipments Selected
                </span>
                <Button
                  size="small"
                  icon={
                    selectedRowKeys.length === shipments.length ? (
                      <Square size={14} />
                    ) : (
                      <CheckSquare size={14} />
                    )
                  }
                  onClick={() => {
                    if (selectedRowKeys.length === shipments.length)
                      setSelectedRowKeys([]);
                    else setSelectedRowKeys(shipments.map((s) => s.id));
                  }}
                >
                  {selectedRowKeys.length === shipments.length
                    ? "Unselect All"
                    : "Select All"}
                </Button>
              </div>
              <Table
                rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                columns={[
                  { title: "Date", dataIndex: "date", key: "date" },
                  {
                    title: "Tracking ID",
                    dataIndex: "trackingId",
                    key: "trackingId",
                    render: (t) => (
                      <span className="font-bold text-blue-600">{t}</span>
                    ),
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    render: (a) => `$${a}`,
                    align: "right" as const,
                  },
                ]}
                dataSource={shipments}
                rowKey="id"
                pagination={false}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Billing Summary">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Subtotal ({selectedRowKeys.length} items)
                    </span>
                    <span className="font-bold text-slate-800">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Apply Discount ($)
                    </label>
                    <InputNumber
                      className="w-full h-11 rounded-xl flex items-center bg-slate-50"
                      min={0}
                      max={subtotal}
                      value={discount}
                      onChange={(val) => setDiscount(val || 0)}
                      prefix={<Percent size={14} className="text-slate-400" />}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-800 text-lg">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${total}
                  </span>
                </div>
                <Button
                  type="primary"
                  block
                  size="large"
                  className="h-12 rounded-xl bg-blue-600 font-bold"
                  icon={<Send size={18} className="mr-2" />}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleSendInvoice}
                >
                  Send Invoice
                </Button>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <Calculator size={16} className="text-blue-500" />
                  <span className="text-[10px] text-blue-700 font-medium">
                    Auto-calculates all selected items with applied discount.
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        title={<span className="font-bold">Finalize Monthly Invoice</span>}
        open={isInvoiceModalOpen}
        onCancel={() => setIsInvoiceModalOpen(false)}
        onOk={handleFinalize}
        okText="Confirm & Send via Email"
        okButtonProps={{ className: "bg-blue-600 rounded-lg h-10" }}
      >
        <div className="py-4 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-700">
              Consolidating {selectedRowKeys.length} shipments for:
            </p>
            <p className="text-lg font-bold text-blue-600">
              {customer.orgName}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-red-500 font-semibold">
              <span>Discount:</span>
              <span>-${discount}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span>Payable Amount:</span>
              <span className="text-blue-600">${total}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            An automated email with the PDF invoice will be sent to{" "}
            {customer.email}.
          </p>
        </div>
      </Modal>
    </div>
  );
};

// ─── Business / Container Instalment View ────────────────────────────────────
const InstalmentInvoiceView: React.FC<{
  customer: Customer;
  onBack: () => void;
  globalInstalments: number;
}> = ({ customer, onBack, globalInstalments }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const instalments = globalInstalments; // driven by global setting
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shipments: Shipment[] = [
    {
      id: "S1",
      trackingId: "ANGL-2001",
      date: "2024-03-01",
      amount: 6000,
      status: "pending_invoice",
    },
    {
      id: "S2",
      trackingId: "ANGL-2005",
      date: "2024-03-08",
      amount: 4800,
      status: "pending_invoice",
    },
    {
      id: "S3",
      trackingId: "ANGL-2013",
      date: "2024-03-15",
      amount: 3200,
      status: "pending_invoice",
    },
  ];

  const subtotal = useMemo(
    () =>
      shipments
        .filter((s) => selectedRowKeys.includes(s.id))
        .reduce((sum, s) => sum + s.amount, 0),
    [selectedRowKeys],
  );
  const total = subtotal - discount;
  const perInstalment = instalments > 0 ? Math.ceil(total / instalments) : 0;

  const instalmentBreakdown = Array.from({ length: instalments }, (_, i) => {
    const isLast = i === instalments - 1;
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i + 1);
    return {
      num: i + 1,
      amount: isLast
        ? total - perInstalment * (instalments - 1)
        : perInstalment,
      due: dueDate.toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      }),
    };
  });

  const handleSend = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one shipment");
      return;
    }
    if (total <= 0) {
      message.warning("Total amount must be greater than 0");
      return;
    }
    setIsModalOpen(true);
  };

  const handleFinalize = () => {
    message.success(
      `${instalments} instalment invoices of ≈$${perInstalment} each sent to ${customer.orgName}`,
    );
    setIsModalOpen(false);
    onBack();
  };

  const tagColor = customer.type === "Business" ? "blue" : "geekblue";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {customer.orgName}
            </h1>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <Tag color={tagColor}>{customer.type}</Tag>• {customer.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipments */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Pending Shipments">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {selectedRowKeys.length} Shipments Selected
                </span>
                <Button
                  size="small"
                  icon={
                    selectedRowKeys.length === shipments.length ? (
                      <Square size={14} />
                    ) : (
                      <CheckSquare size={14} />
                    )
                  }
                  onClick={() => {
                    if (selectedRowKeys.length === shipments.length)
                      setSelectedRowKeys([]);
                    else setSelectedRowKeys(shipments.map((s) => s.id));
                  }}
                >
                  {selectedRowKeys.length === shipments.length
                    ? "Unselect All"
                    : "Select All"}
                </Button>
              </div>
              <Table
                rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                columns={[
                  { title: "Date", dataIndex: "date", key: "date" },
                  {
                    title: "Tracking ID",
                    dataIndex: "trackingId",
                    key: "trackingId",
                    render: (t) => (
                      <span className="font-bold text-blue-600">{t}</span>
                    ),
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    render: (a) => `$${a}`,
                    align: "right" as const,
                  },
                ]}
                dataSource={shipments}
                rowKey="id"
                pagination={false}
              />
            </Card>

            {/* Instalment Breakdown */}
            {selectedRowKeys.length > 0 && total > 0 && (
              <Card
                title={
                  <span className="flex items-center gap-2">
                    <Layers size={16} className="text-blue-600" /> Instalment
                    Breakdown
                  </span>
                }
              >
                <div className="space-y-3 py-2">
                  {instalmentBreakdown.map((inst) => (
                    <div
                      key={inst.num}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          Instalment {inst.num}
                        </p>
                        <p className="text-xs text-slate-400">
                          Due: {inst.due}
                        </p>
                      </div>
                      <span className="text-lg font-black text-blue-600">
                        ${inst.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card title="Instalment Settings">
              <div className="space-y-5">
                {/* Global Instalment Badge */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Instalment Plan (Global)
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <Layers size={16} className="text-blue-500" />
                    <span className="text-sm font-bold text-blue-700">
                      {instalments} Instalments
                    </span>
                    <span className="text-xs text-blue-400 ml-auto">
                      Set globally
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5 italic">
                    To change, go back and update the global setting on the
                    invoices list.
                  </p>
                </div>

                {/* Discount */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Apply Discount ($)
                  </label>
                  <InputNumber
                    className="w-full h-11 rounded-xl flex items-center bg-slate-50"
                    min={0}
                    max={subtotal}
                    value={discount}
                    onChange={(val) => setDiscount(val || 0)}
                    prefix={<Percent size={14} className="text-slate-400" />}
                  />
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-bold">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-red-500 font-semibold">
                      <span>Discount</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Per Instalment ≈</span>
                    <span className="font-bold text-slate-700">
                      ${perInstalment}
                    </span>
                  </div>
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  className="h-12 rounded-xl bg-blue-600 font-bold"
                  icon={<Send size={18} className="mr-2" />}
                  disabled={selectedRowKeys.length === 0 || total <= 0}
                  onClick={handleSend}
                >
                  Send Instalment Invoices
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title={<span className="font-bold">Confirm Instalment Invoice</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleFinalize}
        okText="Confirm & Send All"
        okButtonProps={{ className: "bg-blue-600 rounded-lg h-10" }}
      >
        <div className="py-4 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-700">
              {instalments} instalment invoices for:
            </p>
            <p className="text-lg font-bold text-blue-600">
              {customer.orgName}
            </p>
          </div>
          <div className="space-y-2">
            {instalmentBreakdown.map((inst) => (
              <div key={inst.num} className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Instalment {inst.num} (Due {inst.due})
                </span>
                <span className="font-bold">${inst.amount}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
              <span>Grand Total</span>
              <span className="text-blue-600">${total}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            {instalments} separate invoice emails will be sent to{" "}
            {customer.email} with respective due dates.
          </p>
        </div>
      </Modal>
    </div>
  );
};

// ─── Main Invoice List ────────────────────────────────────────────────────────
const BranchInvoices: React.FC = () => {
  const [filterType, setFilterType] = useState<
    "Business" | "Container" | "Corporate" | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [globalInstalments, setGlobalInstalments] = useState<number>(2);

  const customers: Customer[] = [
    {
      id: "C1",
      name: "Alice Smith",
      email: "alice@apex.com",
      type: "Business",
      orgName: "Apex Corp",
      orgId: "AP-99",
    },
    {
      id: "C2",
      name: "Bob Jones",
      email: "bob@globex.com",
      type: "Container",
      orgName: "Globex Logistics",
      orgId: "GL-12",
    },
    {
      id: "C3",
      name: "Sara Khan",
      email: "sara@techcorp.com",
      type: "Corporate",
      orgName: "TechCorp Solutions",
      orgId: "TC-77",
    },
  ];

  const filteredCustomers = customers.filter((c) => {
    const matchesType = filterType ? c.type === filterType : true;
    const matchesSearch = searchQuery
      ? c.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesSearch;
  });

  // Route to the correct detail view
  if (selectedCustomer) {
    if (selectedCustomer.type === "Corporate") {
      return (
        <CorporateInvoiceView
          customer={selectedCustomer}
          onBack={() => setSelectedCustomer(null)}
        />
      );
    }
    return (
      <InstalmentInvoiceView
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        globalInstalments={globalInstalments}
      />
    );
  }

  const tagColor = (type: string) =>
    type === "Business" ? "blue" : type === "Container" ? "geekblue" : "purple";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1
            className="text-2xl font-bold text-slate-800"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Customer Invoicing
          </h1>
          <p className="text-slate-500 text-sm">
            Find customers to generate consolidated or instalment invoices
          </p>
        </div>

        {/* Instalment Setting */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-5">
            <div>
              <p className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Instalment Plan
              </p>
              <p className="text-xs text-slate-500">
                Applied to all Business & Container customers
              </p>
            </div>
            <div className="flex gap-2">
              {[2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setGlobalInstalments(n)}
                  className={`w-16 py-2 rounded-xl text-sm font-bold border transition-all ${
                    globalInstalments === n
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                      : "bg-white text-slate-500 border-slate-200 hover:border-blue-400"
                  }`}
                >
                  {n}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-50 flex flex-wrap items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <Select
              placeholder="Customer Type"
              style={{ width: 180 }}
              allowClear
              onChange={(val) => setFilterType(val)}
            >
              <Option value="Corporate">Corporate</Option>
              <Option value="Business">Business</Option>
              <Option value="Container">Container</Option>
            </Select>
          </div>

          <Input
            placeholder="Search by Organization Name or Email..."
            prefix={<Search size={18} className="text-slate-400" />}
            className="flex-1 max-w-md h-10 rounded-md border-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table
          columns={[
            {
              title: "Organization",
              key: "org",
              render: (_, record) => (
                <div className="flex items-center gap-3 py-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">
                      {record.orgName}
                    </div>
                    <div className="text-xs text-slate-400">
                      ID: {record.orgId}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Contact",
              key: "contact",
              render: (_, record) => (
                <div>
                  <div className="text-sm font-medium text-slate-700">
                    {record.name}
                  </div>
                  <div className="text-xs text-slate-400">{record.email}</div>
                </div>
              ),
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
              render: (type) => <Tag color={tagColor(type)}>{type}</Tag>,
            },
            {
              title: "Invoice Mode",
              key: "mode",
              render: (_, record) => (
                <span className="text-xs text-slate-500">
                  {record.type === "Corporate"
                    ? "Consolidated"
                    : "Instalment (2–3x)"}
                </span>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              align: "right" as const,
              render: (_, record) => (
                <Button
                  type="primary"
                  ghost
                  className="rounded-lg border-blue-200 hover:border-blue-600"
                  icon={<ChevronRight size={16} />}
                  onClick={() => setSelectedCustomer(record)}
                >
                  View Records
                </Button>
              ),
            },
          ]}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default BranchInvoices;
