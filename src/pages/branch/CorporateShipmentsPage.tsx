import React, { useState, useMemo } from 'react';
import { Table, Tag, Button, Input } from 'antd';
import { Eye, Building2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';

interface CorporateShipmentRequest {
  id: string;
  senderCompany: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  origin: string;
  destination: string;
  packageType: string;
  weight: string;
  status: 'pending_review' | 'processed';
  amount: number | null;
  createdAt: string;
}

const CorporateShipmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [requests] = useState<CorporateShipmentRequest[]>([
    {
      id: 'CSR001',
      senderCompany: 'Tech Corp Africa',
      senderEmail: 'shipping@techcorp.com',
      senderPhone: '+234 901 234 5678',
      receiverName: 'Alice Smith',
      receiverAddress: '123 Main St, London, UK',
      origin: 'Lagos',
      destination: 'London',
      packageType: 'Electronics',
      weight: '12.5 KG',
      status: 'pending_review',
      amount: null,
      createdAt: '2024-03-21',
    },
    {
      id: 'CSR002',
      senderCompany: 'GlobalTrade Ltd',
      senderEmail: 'ops@globaltrade.com',
      senderPhone: '+234 802 987 6543',
      receiverName: 'Bob Johnson',
      receiverAddress: '45 King St, Manchester, UK',
      origin: 'Abuja',
      destination: 'Manchester',
      packageType: 'Textile',
      weight: '35 KG',
      status: 'pending_review',
      amount: null,
      createdAt: '2024-03-22',
    },
  ]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return requests;
    const q = searchQuery.toLowerCase();
    return requests.filter(r =>
      r.senderCompany.toLowerCase().includes(q) ||
      r.senderEmail.toLowerCase().includes(q)
    );
  }, [searchQuery, requests]);

  const columns = [
    {
      title: 'Partner Company',
      key: 'company',
      render: (_: any, record: CorporateShipmentRequest) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Building2 size={18} />
          </div>
          <div>
            <div className="font-bold text-slate-800">{record.senderCompany}</div>
            <div className="text-xs text-slate-400">{record.senderEmail}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Route',
      key: 'route',
      render: (_: any, record: CorporateShipmentRequest) => (
        <span className="text-sm text-slate-600 font-medium">{record.origin} → {record.destination}</span>
      )
    },
    {
      title: 'Package',
      key: 'pkg',
      render: (_: any, record: CorporateShipmentRequest) => (
        <div>
          <Tag color="cyan">{record.packageType}</Tag>
          <span className="text-xs text-slate-400 ml-1">{record.weight}</span>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'pending_review' ? 'orange' : 'green'}>
          {status.toUpperCase().replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_: any, record: CorporateShipmentRequest) => (
        <Button
          type="text"
          icon={<Eye size={16} className="text-slate-500" />}
          onClick={() => navigate(`/branch/corporate-shipments/${record.id}`)}
        />
      ),
    },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Sora, sans-serif' }}>
            Corporate Shipment Requests
          </h1>
          <p className="text-slate-500 text-sm">Review requests from corporate partners and assign pricing</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search by organization name..."
            prefix={<Search size={16} className="text-slate-400" />}
            className="w-72 h-10 rounded-md border-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table columns={columns} dataSource={filtered} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default CorporateShipmentsPage;
