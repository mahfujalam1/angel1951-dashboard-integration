import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Eye, X, Box, CreditCard, FileText, ShieldCheck } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AppTable from '../components/ui/AppTable';
import StatCard from '../components/ui/StatCard';
import StatusBadge from '../components/ui/StatusBadge';
import Avatar from '../components/ui/Avatar';
import { payments } from '../data/mockData';
import type { Payment } from '../types';
import { DollarSign, TrendingUp, Clock, Activity } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [viewPayment, setViewPayment] = useState<Payment | null>(null);

  const filtered = payments.filter(p =>
    p.customer.toLowerCase().includes(search.toLowerCase()) ||
    p.paymentId.toLowerCase().includes(search.toLowerCase())
  );

  const columns: ColumnsType<Payment> = [
    { title: 'ID', key: 'idx', width: 48, render: (_: unknown, __: Payment, i: number) => <span className="text-slate-400 text-sm">{i + 1}.</span> },
    {
      title: 'Customer', key: 'customer',
      render: (_: unknown, r: Payment) => (
        <div className="flex items-center gap-3">
          <Avatar src={r.avatar} name={r.customer} size={36} />
          <span className="font-semibold text-sm text-slate-800">{r.customer}</span>
        </div>
      ),
    },
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId', render: (v: string) => <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{v}</span> },
    {
      title: 'Type', dataIndex: 'type', key: 'type',
      render: (v: string) => <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">{v}</span>,
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (v: string) => <span className="font-bold text-slate-800">{v}</span> },
    { title: 'Method', dataIndex: 'method', key: 'method', render: (v: string) => <span className="text-sm text-slate-500">{v}</span> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: Payment['status']) => <StatusBadge status={s} /> },
    { title: 'Date', dataIndex: 'date', key: 'date', render: (v: string) => <span className="text-xs text-slate-400">{v}</span> },
    {
      title: '', key: 'action', width: 60,
      render: (_: unknown, r: Payment) => (
        <button onClick={() => setViewPayment(r)}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-colors">
          <Eye size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$25,580" icon={<DollarSign size={17} />} color="#2563eb" trend={14} />
        <StatCard label="Paid Amount" value="$18,500" icon={<TrendingUp size={17} />} color="#059669" trend={8} />
        <StatCard label="Pending" value="$6,800" icon={<Clock size={17} />} color="#d97706" trend={-2} />
        <StatCard label="Transactions" value={125} icon={<Activity size={17} />} color="#7c3aed" trend={5} />
      </div>

      <PageHeader title="Payment & Invoice" searchPlaceholder="Search customer, payment ID..." onSearch={setSearch} />

      <AppTable columns={columns} data={filtered.slice((page - 1) * 10, page * 10)}
        total={filtered.length} pageSize={10} current={page} onPageChange={setPage} />

      {/* Payment Details Modal */}
      <Modal 
        open={!!viewPayment} 
        onCancel={() => setViewPayment(null)} 
        footer={null} 
        title={null}
        centered
        width={500}
        closeIcon={<div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500"><X size={16} /></div>}
      >
        {viewPayment && (
          <div className="pt-2">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Payment Information</h2>
              <p className="text-xs text-slate-400">Secure payment processing for logistics services</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Service Type</label>
                <div className="flex items-center gap-2 px-3 h-11 bg-slate-50 border border-slate-100 rounded">
                  <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-slate-400">
                    <Box size={14} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Freight Transport</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Currency</label>
                <div className="flex items-center gap-2 px-3 h-11 bg-slate-50 border border-slate-100 rounded">
                  <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-slate-400">
                    <CreditCard size={14} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">USD - US Dollar</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Amount Payable</label>
              <div className="flex items-center justify-between px-4 h-14 bg-blue-50 border border-blue-100 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    <FileText size={16} />
                  </div>
                  <span className="text-xl font-bold text-blue-700" style={{ fontFamily: 'Sora, sans-serif' }}>45,000.00</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Calculated</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded p-6 border border-slate-100 mb-8">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Order Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Base Freight Charges</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-slate-800 rounded-full"></span>
                    <span className="text-sm font-bold text-slate-700">42,500.00</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-slate-200">
                  <span className="text-sm text-slate-500">Handling & Processing</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-slate-800 rounded-full"></span>
                    <span className="text-sm font-bold text-slate-700">2,500.00</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-slate-800">Total Payable</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    <span className="text-xl font-bold text-blue-700">45,000.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-8 text-slate-400">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <ShieldCheck size={14} /> SSL Secure Payment
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <ShieldCheck size={14} /> Verified Enterprise
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                type="primary" 
                size="large"
                onClick={() => setViewPayment(null)}
                className="w-full h-12 bg-blue-900 hover:bg-blue-800 border-none font-bold text-sm"
                style={{ borderRadius: 12 }}
              >
                ok
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentsPage;
